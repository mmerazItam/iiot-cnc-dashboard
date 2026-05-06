# React Vite IIoT CNC Dashboard Plan

## Summary
Build a new React + Vite app in `iiot-cnc-dashboard/` that simulates MTConnect monitoring for the Haas TM-1P using embedded XML constants only. The dashboard will parse current and sample XML with `DOMParser`, update cards/widgets from parsed state, render a manual HTML5 canvas X/Y trajectory, and include an in-app test protocol for Phase 4 validation.

The existing root files will remain untouched. The implementation will create a self-contained project that runs with:

```bash
cd iiot-cnc-dashboard
npm install
npm run dev
```

## Key Changes

Create this structure:

```text
iiot-cnc-dashboard/
├── package.json
├── index.html
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── data/
    │   └── mtconnectXml.js
    ├── utils/
    │   ├── xmlParsers.js
    │   ├── formatters.js
    │   └── alarmLogic.js
    └── components/
        ├── Header.jsx
        ├── ControlButtons.jsx
        ├── StatusCard.jsx
        ├── MetricCard.jsx
        ├── GaugeCard.jsx
        ├── TagList.jsx
        ├── TrajectoryCanvas.jsx
        ├── AxisPanel.jsx
        └── TestPanel.jsx
```

Implement `src/data/mtconnectXml.js` with embedded XML string constants:

- `TRACE_CURRENT_XML`: compact MTConnect XML containing the real current values from `Trace_current.xml`.
- `TRACE_SAMPLES_XML`: compact MTConnect XML containing the real 16 X/Y sample points, spindle speed series, cycle series, counters, runtime, spindle time, and G-code messages from `Trace_samples.xml`.
- `INVALID_XML`: deliberately malformed XML for parser error test T-09.

The XML snippets will preserve real MTConnect attributes such as `Header creationTime`, `DeviceStream name="TM-1P" uuid="000"`, and `dataItemId` values so the parser will also work if the full original XML files are pasted into the constants later.

## Parser And State Model

Implement `src/utils/xmlParsers.js` with:

- `parseCurrentXml(xmlString)`
- `parseSamplesXml(xmlString)`
- `getTextByDataItemId(doc, id)`
- `getLatestTextByDataItemId(doc, id)`
- `getSeriesByDataItemId(doc, id)`
- `toNumber(value)`
- `safeValue(value, fallback = "Nan")`

Use these confirmed MTConnect IDs:

```js
{
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
  gcodes: "gcodes"
}
```

Parsing behavior:

- `parseCurrentXml` returns the normalized current snapshot object requested in the prompt.
- `parseSamplesXml` returns the normalized samples object requested in the prompt, including `trajectory: [{ timestamp, x, y }]`.
- Missing values return `null` for numeric/state internals and `"Nan"` only at display formatting boundaries.
- Parser errors are caught and returned as `{ source, error, parseOk: false }` so the app never crashes.
- `MachineCondition` uses the tag name `Normal` as `"Normal"` when the MTConnect condition element is empty.

## UI Implementation

Implement `App.jsx` as the dashboard state coordinator:

- `useState` for `currentData`, `sampleData`, `activeData`, `lastSource`, `error`, and optional replay state.
- `useMemo` for derived metrics: machine state, cycle status, parts/hour, visible axis values, active G-codes, and test results.
- `handleLoadCurrent`, `handleLoadSamples`, and `handleReset`.
- Samples view should preserve current snapshot context where useful, especially Z position: show `"Nan in sample window"` and, if current data exists, `"Last known from current: -178.624 mm"`.

Implement components:

- `Header`: title, subtitle, last source, creationTime.
- `ControlButtons`: Load Current Snapshot, Load Samples, Reset Dashboard.
- `StatusCard`: Machine Status list and colored state badge.
- `MetricCard`: reusable numeric/status card with label, value, unit, and status color.
- `GaugeCard`: spindle speed visual/numeric gauge without external charting libraries.
- `TagList`: G-code and coolant badges.
- `TrajectoryCanvas`: manual canvas drawing using `useRef` and `useEffect`.
- `AxisPanel`: X/Y/Z positions with units and missing-Z handling.
- `TestPanel`: visible Phase 4 test table T-01 through T-09.

## Alarm And Formatting Logic

Implement `src/utils/alarmLogic.js`:

- `getMachineState(data)`
- `getStatusColor(status)`
- `getCycleStatus(thisCycle, lastCycle)`
- `getSpindleStatus(spindleSpeed, runStatus)`
- `getAvailabilityStatus(availability)`

Rules:

- `Nan` availability -> `Nan`, dark gray.
- `TRIGGERED` emergency stop -> `fault`, red.
- Active alarms other than `"NO ACTIVE ALARMS"` -> `alarm`, red.
- Non-normal condition -> `warning`, orange.
- `ACTIVE` plus spindle speed > 0 -> `active`, green.
- `FEED_HOLD` -> `hold`, yellow.
- spindle speed 0 without alarms -> `idle`, gray.
- `ThisCycle > LastCycle * 1.1` -> delayed cycle, yellow/orange.
- Missing data -> Nan, dark gray.

Implement `src/utils/formatters.js`:

- `formatNumber(value, digits)`
- `formatWithUnit(value, unit, digits)`
- `formatPercent(value)`
- `formatSeconds(value)`
- `formatPosition(value)`
- `estimatePartsPerHour(lastCycle)`
- `splitCsvTags(value)`

## Trajectory Canvas

`TrajectoryCanvas.jsx` will:

- Accept `trajectory`, `width`, and `height`.
- Draw at responsive CSS size with an internal canvas resolution.
- Use fixed CNC ranges:
  - X: `-500` to `-300` mm
  - Y: `-200` to `-50` mm
- Use 20 px margin.
- Draw bounding box and axis labels.
- Draw full history as light gray connected line.
- Draw sample points as small circles.
- Draw latest point in cyan.
- Label `Start`, `Latest`, `X Position (mm)`, and `Y Position (mm)`.
- Invert Y mapping so larger Y values appear higher visually.
- Draw `"No trajectory data available"` when no valid X/Y points exist.

## Styling

Implement `App.css` as a single clean stylesheet:

- Dark industrial background.
- Responsive CSS grid layout:
  - Header and controls full-width.
  - Top grid: Machine Status, Cycle Status, Production.
  - Middle grid: Process Parameters and details.
  - Bottom grid: Trajectory and Axis Values.
  - Detail/Test sections below.
- Cards with subtle borders, small radius, restrained shadows.
- Large numeric values with always-visible units: `rpm`, `mm`, `s`, `%`, `parts`.
- Colored badges for active, alarm, warning, idle, Nan.
- Mobile layout collapses to one column without text overlap.

## README

Create `README.md` with:

- Project title.
- Description.
- Machine and data source:
  - Haas TM-1P
  - SN `1131432`
  - MTConnect current/sample XML embedded in source.
- Install and run instructions.
- Usage:
  - Click Load Current Snapshot.
  - Click Load Samples.
  - Interpret status colors.
  - Interpret trajectory plot.
- Implementation notes:
  - DOMParser.
  - `dataItemId` selectors.
  - Manual canvas.
  - No backend.
- Testing notes for T-01 through T-09.
- Known limitations:
  - Embedded data, not live.
  - No server polling.
  - Z may be Nan in samples.
  - AddressCodes not parsed into individual widgets.

## Test Plan

Manual/runtime validation:

- `npm install`
- `npm run dev`
- Load current and confirm:
  - SpindleTime `85476 s`
  - M30Counter1 `5522 parts`
  - RunStatus `ACTIVE`
  - Machine state `active` / green
  - X/Y/Z current positions visible in `mm`
- Load samples and confirm:
  - Latest spindle speed approximately `1999.5 rpm`
  - Latest X approximately `-450.6 mm`
  - Latest Y approximately `-119.6 mm`
  - M30Counter1 `5536 parts`
  - Trajectory has `16` plotted X/Y points
  - Z shows Nan in sample window, with last-known current value when available
- Confirm TestPanel T-01 through T-09 reflects pass/manual/load-required states correctly.
- Confirm invalid XML parser test returns an error state without crashing.
- Confirm responsive layout on desktop and narrow mobile widths.

## Assumptions

- The React project will be created under `iiot-cnc-dashboard/`, not in the current root.
- XML constants will use compact relevant MTConnect snippets, not the entire 57 KB / 16 KB files, while keeping parser compatibility with full XML pasted later.
- No external charting library will be used.
- UI text will be English, as requested.
- No backend, polling, file upload, or live MTConnect connection will be implemented.
