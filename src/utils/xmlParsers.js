export const DATA_ITEM_IDS = {
  availability: "avail",
  machineCondition: "mcond",
  activeAlarms: "aalarms",
  mode: "mode",
  runStatus: "rstat",
  program: "ncprog",
  loopsRemaining: "lpremain",
  m30Counter1: "m30c1",
  m30Counter2: "m30c2",
  emergencyStop: "estop",
  rapidOverride: "rovrd",
  feedrateOverride: "fdovrd",
  thisCycle: "tcycle",
  lastCycle: "lcycle",
  cycleRemainingTime: "cyremtim",
  spindleSpeed: "sspeed",
  spindleSpeedOverride: "ssovrd",
  machineRunTime: "machineruntime",
  activeAxes: "xyzabc",
  xPosition: "x_axis_actual_position",
  yPosition: "y_axis_actual_position",
  zPosition: "z_axis_actual_position",
  spindleEnabled: "sp1enabled",
  spindleMaxPower: "sp1maxpwr",
  spindleTime: "spindletime",
  g54: "g54",
  gcodes: "gcodes",
};

const COOLANT_IDS = {
  TscEnabled: "tsc",
  HpcEnabled: "hpc",
  CoolantSpigotEnabled: "clntspigot",
  ShowerCoolantEnabled: "showerclnt",
  PulseJet: "pulsejet",
  MistEnabled: "mist",
  TabEnabled: "tab",
};

function parseXml(xmlString, source) {
  try {
    // DOMParser is deliberately used because this frontend mirrors the
    // Phase 3 requirement: the browser receives XML text and extracts
    // MTConnect values directly, without a backend normalization layer.
    const doc = new DOMParser().parseFromString(xmlString, "application/xml");
    const parserError = doc.querySelector("parsererror");

    if (parserError) {
      return {
        doc: null,
        error: parserError.textContent?.trim() || "Invalid XML document.",
      };
    }

    return { doc, error: null };
  } catch (error) {
    return { doc: null, error: error.message || `Unable to parse ${source} XML.` };
  }
}

export function getTextByDataItemId(doc, id) {
  // Attribute selectors keep the parser independent of MTConnect tag names.
  // For example, "sspeed" can be a SpindleSpeed element in current or samples.
  const node = doc?.querySelector(`[dataItemId="${id}"]`);
  if (!node) return null;

  const text = node.textContent?.trim();
  if (text) return text;

  // MTConnect condition items often appear as empty <Normal .../> elements.
  // The semantic value is then the element name rather than text content.
  return node.tagName || null;
}

export function getLatestTextByDataItemId(doc, id) {
  const nodes = Array.from(doc?.querySelectorAll(`[dataItemId="${id}"]`) || []);
  const latest = nodes.at(-1);
  if (!latest) return null;

  const text = latest.textContent?.trim();
  return text || latest.tagName || null;
}

export function getSeriesByDataItemId(doc, id) {
  // Series retain timestamps and raw text so widgets can display latest values
  // while the test panel can still validate sample-window behavior.
  return Array.from(doc?.querySelectorAll(`[dataItemId="${id}"]`) || []).map(
    (node) => ({
      timestamp: node.getAttribute("timestamp"),
      sequence: toNumber(node.getAttribute("sequence")),
      text: node.textContent?.trim() || node.tagName || null,
      value: toNumber(node.textContent),
    })
  );
}

export function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number.parseFloat(String(value).trim());
  return Number.isFinite(parsed) ? parsed : null;
}

export function safeValue(value, fallback = "UNAVAILABLE") {
  return value === null || value === undefined || value === "" ? fallback : value;
}

function getHeaderMetadata(doc) {
  const header = doc.querySelector("Header");
  const device = doc.querySelector("DeviceStream");

  return {
    creationTime: header?.getAttribute("creationTime") || null,
    machineName: device?.getAttribute("name") || null,
    uuid: device?.getAttribute("uuid") || null,
  };
}

function getCoolantStates(doc) {
  return Object.fromEntries(
    Object.entries(COOLANT_IDS).map(([label, id]) => [
      label,
      getLatestTextByDataItemId(doc, id),
    ])
  );
}

export function parseCurrentXml(xmlString) {
  const { doc, error } = parseXml(xmlString, "current");
  if (error) return { source: "current", parseOk: false, error };

  const metadata = getHeaderMetadata(doc);

  return {
    source: "current",
    parseOk: true,
    ...metadata,
    availability: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.availability),
    machineCondition: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.machineCondition),
    activeAlarms: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.activeAlarms),
    mode: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.mode),
    runStatus: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.runStatus),
    program: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.program),
    loopsRemaining: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.loopsRemaining)),
    m30Counter1: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.m30Counter1)),
    m30Counter2: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.m30Counter2)),
    emergencyStop: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.emergencyStop),
    rapidOverride: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.rapidOverride)),
    feedrateOverride: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.feedrateOverride)),
    thisCycle: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.thisCycle)),
    lastCycle: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.lastCycle)),
    cycleRemainingTime: toNumber(
      getLatestTextByDataItemId(doc, DATA_ITEM_IDS.cycleRemainingTime)
    ),
    spindleSpeed: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.spindleSpeed)),
    spindleSpeedOverride: toNumber(
      getLatestTextByDataItemId(doc, DATA_ITEM_IDS.spindleSpeedOverride)
    ),
    machineRunTime: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.machineRunTime)),
    activeAxes: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.activeAxes),
    xPosition: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.xPosition)),
    yPosition: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.yPosition)),
    zPosition: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.zPosition)),
    spindleEnabled: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.spindleEnabled),
    spindleMaxPower: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.spindleMaxPower)),
    spindleTime: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.spindleTime)),
    g54: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.g54),
    gcodes: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.gcodes),
    coolantStates: getCoolantStates(doc),
  };
}

export function parseSamplesXml(xmlString) {
  const { doc, error } = parseXml(xmlString, "samples");
  if (error) return { source: "samples", parseOk: false, error };

  const metadata = getHeaderMetadata(doc);
  const xSeries = getSeriesByDataItemId(doc, DATA_ITEM_IDS.xPosition);
  const ySeries = getSeriesByDataItemId(doc, DATA_ITEM_IDS.yPosition);
  const spindleSpeedSeries = getSeriesByDataItemId(doc, DATA_ITEM_IDS.spindleSpeed);
  const thisCycleSeries = getSeriesByDataItemId(doc, DATA_ITEM_IDS.thisCycle);

  const trajectory = xSeries
    .map((xPoint, index) => {
      const yPoint = ySeries[index];
      return {
        timestamp: xPoint.timestamp || yPoint?.timestamp || null,
        x: xPoint.value,
        y: yPoint?.value ?? null,
      };
    })
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));

  return {
    source: "samples",
    parseOk: true,
    ...metadata,
    latestSpindleSpeed: spindleSpeedSeries.at(-1)?.value ?? null,
    spindleSpeedSeries,
    thisCycleSeries,
    latestThisCycle: thisCycleSeries.at(-1)?.value ?? null,
    latestM30Counter1: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.m30Counter1)),
    latestM30Counter2: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.m30Counter2)),
    latestMachineRunTime: toNumber(
      getLatestTextByDataItemId(doc, DATA_ITEM_IDS.machineRunTime)
    ),
    latestSpindleTime: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.spindleTime)),
    latestGcodes: getLatestTextByDataItemId(doc, DATA_ITEM_IDS.gcodes),
    trajectory,
    latestX: trajectory.at(-1)?.x ?? null,
    latestY: trajectory.at(-1)?.y ?? null,
    latestZ: toNumber(getLatestTextByDataItemId(doc, DATA_ITEM_IDS.zPosition)),
  };
}
