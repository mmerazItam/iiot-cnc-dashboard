import { useEffect, useMemo, useState } from "react";
import { formatPosition } from "../utils/formatters.js";

const SPEED_OPTIONS = [250, 500, 700, 1000];

function clampIndex(index, total) {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}

export default function TrajectoryReplay({
  trajectory,
  currentIndex,
  currentGcode,
  onStepChange,
  onReplayEvent,
  speedMs = 700,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState(speedMs);
  const [internalIndex, setInternalIndex] = useState(0);
  const totalSteps = trajectory?.length || 0;
  const activeIndex = clampIndex(
    Number.isInteger(currentIndex) ? currentIndex : internalIndex,
    totalSteps
  );

  const currentPoint = useMemo(() => {
    return totalSteps > 0 ? trajectory[activeIndex] : null;
  }, [trajectory, totalSteps, activeIndex]);

  function updateStep(nextIndex, action) {
    const clampedIndex = clampIndex(nextIndex, totalSteps);
    setInternalIndex(clampedIndex);
    onStepChange?.(clampedIndex, action);
    onReplayEvent?.(action, clampedIndex);
  }

  function handlePlay() {
    if (totalSteps === 0) return;
    setIsPlaying(true);
    onReplayEvent?.("play", activeIndex);
  }

  function handlePause() {
    setIsPlaying(false);
    onReplayEvent?.("pause", activeIndex);
  }

  function handleReset() {
    setIsPlaying(false);
    updateStep(0, "reset");
  }

  function handleForward() {
    setIsPlaying(false);
    updateStep(activeIndex + 1, "step-forward");
  }

  function handleBackward() {
    setIsPlaying(false);
    updateStep(activeIndex - 1, "step-backward");
  }

  useEffect(() => {
    if (totalSteps === 0) {
      setIsPlaying(false);
      setInternalIndex(0);
      return;
    }

    updateStep(activeIndex, "sync");
    // The trajectory array is never mutated; replay is only an integer cursor
    // over the existing sample list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSteps]);

  useEffect(() => {
    if (!isPlaying || totalSteps === 0) return undefined;

    // setInterval advances the replay cursor one sample at a time. Returning
    // clearInterval from useEffect prevents orphan timers when the user pauses,
    // changes speed, loads another trace, or leaves the component.
    const intervalId = window.setInterval(() => {
      const nextIndex = activeIndex + 1;

      if (nextIndex >= totalSteps) {
        setIsPlaying(false);
        updateStep(totalSteps - 1, "play-complete");
        return;
      }

      updateStep(nextIndex, "play-step");
    }, selectedSpeed);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isPlaying, onReplayEvent, selectedSpeed, totalSteps]);

  const progress = totalSteps > 1 ? (activeIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <section className="card replay-card">
      <div className="card-heading">
        <h2>Replay Motion</h2>
        <span>{totalSteps > 0 ? `Step ${activeIndex + 1} / ${totalSteps}` : "No path"}</span>
      </div>

      <div className="replay-controls" aria-label="Trajectory replay controls">
        <button type="button" onClick={handlePlay} disabled={totalSteps === 0 || isPlaying}>
          Play
        </button>
        <button type="button" className="ghost" onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
        <button type="button" className="ghost" onClick={handleReset} disabled={totalSteps === 0}>
          Reset
        </button>
        <button
          type="button"
          className="ghost"
          onClick={handleBackward}
          disabled={totalSteps === 0 || activeIndex === 0}
        >
          Step Backward
        </button>
        <button
          type="button"
          className="secondary"
          onClick={handleForward}
          disabled={totalSteps === 0 || activeIndex >= totalSteps - 1}
        >
          Step Forward
        </button>
      </div>

      <label className="speed-select">
        Speed
        <select
          value={selectedSpeed}
          onChange={(event) => setSelectedSpeed(Number(event.target.value))}
        >
          {SPEED_OPTIONS.map((speed) => (
            <option key={speed} value={speed}>
              {speed} ms
            </option>
          ))}
        </select>
      </label>

      <dl className="replay-readout">
        <div>
          <dt>Timestamp</dt>
          <dd>{currentPoint?.timestamp ?? "UNAVAILABLE"}</dd>
        </div>
        <div>
          <dt>X Position</dt>
          <dd>{currentPoint ? formatPosition(currentPoint.x) : "UNAVAILABLE"}</dd>
        </div>
        <div>
          <dt>Y Position</dt>
          <dd>{currentPoint ? formatPosition(currentPoint.y) : "UNAVAILABLE"}</dd>
        </div>
        {currentGcode ? (
          <div>
            <dt>Current G-code</dt>
            <dd>{currentGcode}</dd>
          </div>
        ) : null}
        {currentPoint?.warning ? (
          <div className="replay-warning">
            <dt>Warning</dt>
            <dd>{currentPoint.warning}</dd>
          </div>
        ) : null}
        {currentPoint?.alarm ? (
          <div className="replay-alarm">
            <dt>Alarm</dt>
            <dd>{currentPoint.activeAlarms ?? "ACTIVE ALARM"}</dd>
          </div>
        ) : null}
      </dl>

      <div className="replay-progress" aria-label="Replay progress">
        <div style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}
