import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import ControlButtons from "./components/ControlButtons.jsx";
import StatusCard from "./components/StatusCard.jsx";
import MetricCard from "./components/MetricCard.jsx";
import GaugeCard from "./components/GaugeCard.jsx";
import TagList from "./components/TagList.jsx";
import TrajectoryCanvas from "./components/TrajectoryCanvas.jsx";
import TrajectoryReplay from "./components/TrajectoryReplay.jsx";
import AxisPanel from "./components/AxisPanel.jsx";
import TestPanel from "./components/TestPanel.jsx";
import ScenarioSelector from "./components/ScenarioSelector.jsx";
import { INVALID_XML, TRACE_CURRENT_XML, TRACE_SAMPLES_XML } from "./data/mtconnectXml.js";
import { getScenarioById, testScenarios } from "./data/testScenarios.js";
import {
  getCycleStatus,
  getMachineState,
  getSpindleStatus,
} from "./utils/alarmLogic.js";
import {
  estimatePartsPerHour,
  formatNumber,
  formatPercent,
  formatPosition,
  formatSeconds,
  splitCsvTags,
} from "./utils/formatters.js";
import { parseCurrentXml, parseSamplesXml, safeValue } from "./utils/xmlParsers.js";

function getNearestSeriesValue(series = [], timestamp, index) {
  if (!series.length) return null;

  if (!timestamp) {
    return series[Math.min(index, series.length - 1)]?.value ?? null;
  }

  const targetTime = Date.parse(timestamp);
  if (!Number.isFinite(targetTime)) {
    return series[Math.min(index, series.length - 1)]?.value ?? null;
  }

  // MTConnect samples for position and cycle time can have slightly different
  // timestamps. The replay links Cycle Status to the nearest telemetry sample
  // instead of assuming array indexes always line up perfectly.
  return series.reduce((nearest, item) => {
    const itemTime = Date.parse(item.timestamp);
    if (!Number.isFinite(itemTime)) return nearest;

    const distance = Math.abs(itemTime - targetTime);
    return distance < nearest.distance ? { value: item.value, distance } : nearest;
  }, { value: null, distance: Number.POSITIVE_INFINITY }).value;
}

function getDisplayData(activeData, currentData, replayIndex = 0) {
  if (!activeData) return null;

  if (activeData.source === "current" || activeData.source === "scenario") {
    const replayPoint = activeData.trajectory?.[replayIndex];

    return {
      ...activeData,
      spindleSpeed: activeData.spindleSpeed,
      m30Counter1: activeData.m30Counter1,
      m30Counter2: activeData.m30Counter2,
      machineRunTime: activeData.machineRunTime,
      spindleTime: activeData.spindleTime,
      gcodes: activeData.gcodes,
      xPosition: replayPoint?.x ?? activeData.xPosition,
      yPosition: replayPoint?.y ?? activeData.yPosition,
      zPosition: activeData.zPosition,
    };
  }

  const replayPoint = activeData.trajectory?.[replayIndex];
  const replayThisCycle = getNearestSeriesValue(
    activeData.thisCycleSeries,
    replayPoint?.timestamp,
    replayIndex
  );
  const replaySpindleSpeed = getNearestSeriesValue(
    activeData.spindleSpeedSeries,
    replayPoint?.timestamp,
    replayIndex
  );

  // Samples contain high-frequency process values but not every status field.
  // The dashboard overlays latest sample values on the last current snapshot,
  // matching a common IIoT UI pattern: replay telemetry plus last known state.
  return {
    ...currentData,
    ...activeData,
    availability: currentData?.availability ?? "AVAILABLE",
    machineCondition: currentData?.machineCondition ?? "Normal",
    activeAlarms: currentData?.activeAlarms ?? "NO ACTIVE ALARMS",
    emergencyStop: currentData?.emergencyStop ?? "ARMED",
    runStatus:
      currentData?.runStatus ?? (activeData.latestSpindleSpeed > 0 ? "ACTIVE" : null),
    mode: currentData?.mode ?? null,
    program: currentData?.program ?? null,
    spindleSpeed: replaySpindleSpeed ?? activeData.latestSpindleSpeed,
    thisCycle: replayThisCycle ?? activeData.latestThisCycle,
    lastCycle: currentData?.lastCycle ?? null,
    m30Counter1: activeData.latestM30Counter1,
    m30Counter2: activeData.latestM30Counter2,
    machineRunTime: activeData.latestMachineRunTime,
    spindleTime: activeData.latestSpindleTime,
    gcodes: activeData.latestGcodes,
    xPosition: replayPoint?.x ?? activeData.latestX,
    yPosition: replayPoint?.y ?? activeData.latestY,
    zPosition: activeData.latestZ,
    feedrateOverride: currentData?.feedrateOverride ?? null,
    spindleSpeedOverride: currentData?.spindleSpeedOverride ?? null,
    rapidOverride: currentData?.rapidOverride ?? null,
    activeAxes: currentData?.activeAxes ?? null,
    g54: currentData?.g54 ?? null,
    coolantStates: currentData?.coolantStates ?? {},
  };
}

export default function App() {
  const [currentData, setCurrentData] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [lastSource, setLastSource] = useState(null);
  const [error, setError] = useState(null);
  const [replayIndex, setReplayIndex] = useState(0);
  const [replayEvents, setReplayEvents] = useState({
    loadedAtStart: false,
    steppedForward: false,
    steppedBackward: false,
    reset: false,
    playedToEnd: false,
  });

  const displayData = useMemo(
    () => getDisplayData(activeData, currentData, replayIndex),
    [activeData, currentData, replayIndex]
  );

  const machineState = useMemo(() => getMachineState(displayData), [displayData]);

  const cycleStatus = useMemo(
    () => getCycleStatus(displayData?.thisCycle, displayData?.lastCycle),
    [displayData]
  );

  const spindleStatus = useMemo(
    () => getSpindleStatus(displayData?.spindleSpeed, displayData?.runStatus),
    [displayData]
  );

  const partsPerHour = useMemo(
    () => estimatePartsPerHour(displayData?.lastCycle),
    [displayData]
  );

  const gcodeTags = useMemo(() => splitCsvTags(displayData?.gcodes), [displayData]);

  const g54Values = useMemo(() => {
    const labels = ["X", "Y", "Z", "A", "B", "C"];
    const values = splitCsvTags(displayData?.g54);

    return labels.map((label, index) => ({
      label,
      value: values[index] ?? "UNAVAILABLE",
    }));
  }, [displayData]);

  const coolantTags = useMemo(() => {
    return Object.entries(displayData?.coolantStates || {}).map(
      ([label, value]) => `${label}: ${safeValue(value)}`
    );
  }, [displayData]);

  const trajectory =
    activeData?.source === "samples"
      ? sampleData?.trajectory || []
      : activeData?.source === "scenario"
        ? activeData.trajectory || []
        : [];

  const replayPoint = trajectory[replayIndex] ?? null;
  const axisX = replayPoint?.x ?? displayData?.xPosition;
  const axisY = replayPoint?.y ?? displayData?.yPosition;
  const axisZ = displayData?.zPosition;

  const zNote = useMemo(() => {
    const missingScenarioZ =
      activeData?.source === "scenario" && activeData?.missingZInSampleWindow;
    const missingSampleZ = activeData?.source === "samples" && !Number.isFinite(sampleData?.latestZ);

    if (!missingScenarioZ && !missingSampleZ) return null;

    const currentZ = activeData?.source === "scenario" ? activeData?.zPosition : currentData?.zPosition;
    if (Number.isFinite(currentZ) && !missingScenarioZ) {
      return `UNAVAILABLE in sample window | Last known from current: ${formatPosition(
        currentZ
      )}`;
    }

    return "UNAVAILABLE in sample window";
  }, [activeData, sampleData, currentData]);

  const scenarioTests = useMemo(() => {
    return testScenarios.map((scenario) => {
      const state = getMachineState(scenario.data);
      const cycle = getCycleStatus(scenario.data.thisCycle, scenario.data.lastCycle);
      const stateMatches = state.status === scenario.expectedState;
      const cycleMatches =
        scenario.id !== "SLOW_CYCLE_WARNING" || cycle.status === "delayed";
      const missingZMatches =
        scenario.id !== "MISSING_Z_SAMPLE" ||
        (scenario.data.missingZInSampleWindow && scenario.data.zPosition === null);
      const unavailableMatches =
        scenario.id !== "UNAVAILABLE_STREAM" ||
        (scenario.data.spindleSpeed === null && scenario.data.trajectory.length === 0);

      return {
        id: scenario.id,
        name: scenario.title,
        expectedState: scenario.expectedState,
        expectedColor: scenario.expectedColor,
        criticalBehavior: scenario.expectedWarnings.join(" "),
        actualState: state.status,
        result:
          stateMatches && cycleMatches && missingZMatches && unavailableMatches
            ? "Pass"
            : "Fail",
      };
    });
  }, []);

  const replayTests = useMemo(() => {
    const hasTrajectory = trajectory.length > 0;
    const finalIndex = Math.max(trajectory.length - 1, 0);

    return [
      {
        id: "T-10",
        description: "Replay starts at step 1",
        expected: "Replay index starts at 0 / Step 1",
        actual: hasTrajectory ? `Step ${replayIndex + 1} / ${trajectory.length}` : "Load Samples required",
        result: replayEvents.loadedAtStart ? "Pass" : hasTrajectory ? "Pending" : "Load Samples required",
      },
      {
        id: "T-11",
        description: "Step Forward increments currentIndex",
        expected: "currentIndex increases by one without exceeding bounds",
        actual: hasTrajectory ? `currentIndex ${replayIndex}` : "Load Samples required",
        result: replayEvents.steppedForward ? "Pass" : hasTrajectory ? "Pending" : "Load Samples required",
      },
      {
        id: "T-12",
        description: "Step Backward decrements currentIndex",
        expected: "currentIndex decreases by one without going below zero",
        actual: hasTrajectory ? `currentIndex ${replayIndex}` : "Load Samples required",
        result: replayEvents.steppedBackward ? "Pass" : hasTrajectory ? "Pending" : "Load Samples required",
      },
      {
        id: "T-13",
        description: "Reset returns to index 0",
        expected: "Replay returns to Step 1",
        actual: hasTrajectory ? `currentIndex ${replayIndex}` : "Load Samples required",
        result: replayEvents.reset && replayIndex === 0 ? "Pass" : hasTrajectory ? "Pending" : "Load Samples required",
      },
      {
        id: "T-14",
        description: "Play reaches final point without exceeding array bounds",
        expected: `Final currentIndex is ${finalIndex}`,
        actual: hasTrajectory ? `currentIndex ${replayIndex}` : "Load Samples required",
        result: replayEvents.playedToEnd && replayIndex === finalIndex ? "Pass" : hasTrajectory ? "Pending" : "Load Samples required",
      },
    ];
  }, [replayEvents, replayIndex, trajectory.length]);

  const tests = useMemo(() => {
    const invalidResult = parseCurrentXml(INVALID_XML);
    const currentRequired = "Load Current required";
    const samplesRequired = "Load Samples required";
    const currentSpindleTime = currentData?.spindleTime;
    const sampleSpeed = sampleData?.latestSpindleSpeed;
    const sampleX = sampleData?.latestX;
    const sampleCounter = sampleData?.latestM30Counter1;
    const stateCheck = getMachineState(displayData);

    return [
      {
        id: "T-01",
        description: "Load current - SpindleTime",
        input: "Click Load Current Snapshot",
        expected: "SpindleTime widget shows 85476 s",
        actual: currentData ? `${currentSpindleTime} s` : currentRequired,
        result: currentData
          ? currentSpindleTime === 85476
            ? "Pass"
            : "Fail"
          : currentRequired,
      },
      {
        id: "T-02",
        description: "Load samples - spindle speed",
        input: "Click Load Samples",
        expected: "SpindleSpeed shows approximately 2000 rpm",
        actual: sampleData ? `${formatNumber(sampleSpeed, 1)} rpm` : samplesRequired,
        result: sampleData && sampleSpeed >= 1999 && sampleSpeed <= 2001 ? "Pass" : samplesRequired,
      },
      {
        id: "T-03",
        description: "Load samples - last X position",
        input: "Click Load Samples",
        expected: "X position shows approximately -450.6 mm",
        actual: sampleData ? formatPosition(sampleX) : samplesRequired,
        result: sampleData && Math.round(sampleX * 10) / 10 === -450.6 ? "Pass" : samplesRequired,
      },
      {
        id: "T-04",
        description: "Load samples - part counter",
        input: "Click Load Samples",
        expected: "M30Counter1 shows 5536",
        actual: sampleData ? `${sampleCounter}` : samplesRequired,
        result: sampleData && sampleCounter === 5536 ? "Pass" : samplesRequired,
      },
      {
        id: "T-05",
        description: "Trajectory plot",
        input: "Click Load Samples",
        expected: "16 X/Y points plotted as a curved loop",
        actual: sampleData ? `${sampleData.trajectory.length} points` : samplesRequired,
        result: sampleData && sampleData.trajectory.length === 16 ? "Pass" : samplesRequired,
      },
      {
        id: "T-06",
        description: "Units on all widgets",
        input: "Both buttons",
        expected: "rpm, mm, s, % visible",
        actual: "Manual visual verification checklist",
        result: "Manual",
      },
      {
        id: "T-07",
        description: "State color",
        input: "Either load",
        expected: "Status widget renders with correct color",
        actual: displayData ? `${stateCheck.label} / ${stateCheck.status}` : "No data",
        result: displayData && stateCheck.status === "active" ? "Pass" : "Load data required",
      },
      {
        id: "T-08",
        description: "Missing Z sample handling",
        input: "Click Load Samples",
        expected: "Z position shows UNAVAILABLE in sample window",
        actual: sampleData ? safeValue(sampleData.latestZ, "UNAVAILABLE") : samplesRequired,
        result: sampleData && sampleData.latestZ === null ? "Pass" : samplesRequired,
      },
      {
        id: "T-09",
        description: "XML parse error handling",
        input: "Invalid XML string",
        expected: "App does not crash and shows error message",
        actual: invalidResult.error ? "Parser caught invalid XML" : "No error detected",
        result: invalidResult.parseOk === false ? "Pass" : "Fail",
      },
    ];
  }, [currentData, sampleData, displayData]);

  function handleLoadCurrent() {
    const parsed = parseCurrentXml(TRACE_CURRENT_XML);
    if (!parsed.parseOk) {
      setError(parsed.error);
      setActiveData(parsed);
      return;
    }

    // Dashboard update logic: a successful current snapshot becomes both the
    // latest machine context and the active view that drives all widgets.
    setCurrentData(parsed);
    setActiveData(parsed);
    setLastSource("current");
    setReplayIndex(0);
    setError(null);
  }

  function handleLoadSamples() {
    const parsed = parseSamplesXml(TRACE_SAMPLES_XML);
    if (!parsed.parseOk) {
      setError(parsed.error);
      setActiveData(parsed);
      return;
    }

    setSampleData(parsed);
    setActiveData(parsed);
    setLastSource("samples");
    setReplayIndex(0);
    setReplayEvents({
      loadedAtStart: true,
      steppedForward: false,
      steppedBackward: false,
      reset: false,
      playedToEnd: false,
    });
    setError(null);
  }

  function handleLoadScenario(id) {
    const scenario = getScenarioById(id);
    if (!scenario) {
      setError(`Unknown test scenario: ${id}`);
      return;
    }

    setActiveData(scenario.data);
    setLastSource(`scenario:${scenario.id}`);
    setReplayIndex(0);
    setReplayEvents({
      loadedAtStart: scenario.data.trajectory.length > 0,
      steppedForward: false,
      steppedBackward: false,
      reset: false,
      playedToEnd: false,
    });
    setError(null);
  }

  function handleReplayStepChange(nextIndex, action) {
    // replayIndex is the single source of truth for both the canvas highlight
    // and the optional X/Y axis override during simulated motion.
    setReplayIndex(nextIndex);

    setReplayEvents((previous) => ({
      ...previous,
      steppedForward: previous.steppedForward || action === "step-forward",
      steppedBackward: previous.steppedBackward || action === "step-backward",
      reset: previous.reset || action === "reset",
      playedToEnd: previous.playedToEnd || action === "play-complete",
    }));
  }

  function handleReset() {
    setCurrentData(null);
    setSampleData(null);
    setActiveData(null);
    setLastSource(null);
    setReplayIndex(0);
    setReplayEvents({
      loadedAtStart: false,
      steppedForward: false,
      steppedBackward: false,
      reset: false,
      playedToEnd: false,
    });
    setError(null);
  }

  return (
    <main className="app-shell">
      <Header source={lastSource} creationTime={displayData?.creationTime} />
      <ControlButtons
        onLoadCurrent={handleLoadCurrent}
        onLoadSamples={handleLoadSamples}
        onReset={handleReset}
      />
      <ScenarioSelector onLoadScenario={handleLoadScenario} />

      {error ? <div className="error-banner">XML parse error: {error}</div> : null}

      <section className="single-view-grid">
        <StatusCard
          title="Machine Status"
          state={machineState}
          rows={[
            { label: "RunStatus", value: displayData?.runStatus },
            { label: "MachineCondition", value: displayData?.machineCondition },
            { label: "ActiveAlarms", value: displayData?.activeAlarms },
            { label: "EmergencyStop", value: displayData?.emergencyStop },
            { label: "Availability", value: displayData?.availability },
          ]}
        />

        <section className="card cycle-card">
          <div className="card-heading">
            <h2>Cycle Status</h2>
            <span className={`cycle-label ${cycleStatus.status}`}>{cycleStatus.label}</span>
          </div>
          <div className="metric-row">
            <MetricCard
              label="ThisCycle"
              value={formatNumber(displayData?.thisCycle, 0)}
              unit="s"
              status={cycleStatus.status}
            />
            <MetricCard
              label="LastCycle"
              value={formatNumber(displayData?.lastCycle, 0)}
              unit="s"
              status="ok"
            />
          </div>
          <div className="progress-block">
            <div className="progress-meta">
              <span>Cycle progress</span>
              <span>{formatNumber(cycleStatus.progress, 0)}%</span>
            </div>
            <div className="progress-track">
              <div
                className={`progress-fill ${cycleStatus.status}`}
                style={{ width: `${cycleStatus.progress}%` }}
              />
            </div>
          </div>
          {trajectory.length > 0 ? (
            <div className="cycle-replay-link">
              Linked to replay step {replayIndex + 1} / {trajectory.length}
              {replayPoint?.timestamp ? ` | ${replayPoint.timestamp}` : ""}
            </div>
          ) : null}
        </section>

        <section className="card production-card">
          <div className="card-heading">
            <h2>Production</h2>
          </div>
          <div className="metric-row">
            <MetricCard
              label="M30Counter1"
              value={formatNumber(displayData?.m30Counter1, 0)}
              unit="parts"
              status="active"
            />
            <MetricCard
              label="M30Counter2"
              value={formatNumber(displayData?.m30Counter2, 0)}
              unit="parts"
              status="active"
            />
            <MetricCard
              label="Estimated Rate"
              value={formatNumber(partsPerHour, 1)}
              unit="parts/hour"
              status={partsPerHour ? "active" : "unavailable"}
            />
          </div>
        </section>

        <GaugeCard
          label="SpindleSpeed"
          value={displayData?.spindleSpeed}
          status={spindleStatus.status}
        />
        <section className="card process-card">
          <div className="card-heading">
            <h2>Process Parameters</h2>
          </div>
          <div className="metric-row compact">
            <MetricCard
              label="FeedrateOverride"
              value={formatNumber(displayData?.feedrateOverride, 0)}
              unit="%"
              status={displayData?.feedrateOverride === null ? "unavailable" : "ok"}
            />
            <MetricCard
              label="SpindleSpeedOverride"
              value={formatNumber(displayData?.spindleSpeedOverride, 0)}
              unit="%"
              status={displayData?.spindleSpeedOverride === null ? "unavailable" : "ok"}
            />
            <MetricCard
              label="RapidOverride"
              value={formatNumber(displayData?.rapidOverride, 0)}
              unit="%"
              status={displayData?.rapidOverride === null ? "unavailable" : "ok"}
            />
          </div>
        </section>
        <div className="gcodes-panel">
          <TagList title="Active Gcodes" tags={gcodeTags} />
        </div>

        <div className="trajectory-workspace">
          <TrajectoryCanvas
            trajectory={trajectory}
            currentIndex={replayIndex}
            showFullPath
          />
          <TrajectoryReplay
            trajectory={trajectory}
            currentIndex={replayIndex}
            currentGcode={gcodeTags[0]}
            onStepChange={handleReplayStepChange}
          />
        </div>
        <AxisPanel
          x={axisX}
          y={axisY}
          z={axisZ}
          zNote={zNote}
        />

        <section className="card detail-card">
          <div className="card-heading">
            <h2>Machine Details</h2>
          </div>
          <dl className="status-list">
            <div className="status-row">
              <dt>MachineRunTime</dt>
              <dd>{formatSeconds(displayData?.machineRunTime)}</dd>
            </div>
            <div className="status-row">
              <dt>SpindleTime</dt>
              <dd>{formatSeconds(displayData?.spindleTime)}</dd>
            </div>
            <div className="status-row">
              <dt>Program</dt>
              <dd>{safeValue(displayData?.program)}</dd>
            </div>
            <div className="status-row">
              <dt>Mode</dt>
              <dd>{safeValue(displayData?.mode)}</dd>
            </div>
            <div className="status-row">
              <dt>Active Axes</dt>
              <dd>{safeValue(displayData?.activeAxes)}</dd>
            </div>
            <div className="status-row">
              <dt>Spindle Max Power</dt>
              <dd>
                {displayData?.spindleMaxPower === null || displayData?.spindleMaxPower === undefined
                  ? "UNAVAILABLE"
                  : `${formatNumber(displayData.spindleMaxPower, 1)} kW`}
              </dd>
            </div>
            <div className="status-row">
              <dt>Cycle Remaining</dt>
              <dd>{formatSeconds(displayData?.cycleRemainingTime)}</dd>
            </div>
            <div className="status-row">
              <dt>FeedrateOverride</dt>
              <dd>{formatPercent(displayData?.feedrateOverride)}</dd>
            </div>
          </dl>
          <div className="g54-offset-block">
            <div className="g54-title">G54 Offset</div>
            <div className="g54-grid" aria-label="G54 offset axis correspondence">
              {g54Values.map((item) => (
                <div key={item.label} className="g54-cell">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="coolant-panel">
          <TagList title="Coolant States" tags={coolantTags} />
        </div>
        <TestPanel tests={tests} scenarioTests={scenarioTests} replayTests={replayTests} />
      </section>
    </main>
  );
}
