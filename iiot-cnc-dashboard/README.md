# Haas TM-1P Production Dashboard

React + Vite dashboard for CNC production monitoring with embedded MTConnect XML data. The app simulates Phase 3 dashboard behavior and Phase 4 testing for a Haas TM-1P machine.

## Machine And Data Source

- Machine: Haas TM-1P
- Serial number: `1131432`
- Source format: MTConnect XML
- Embedded files represented in code:
  - `Trace_current.xml`
  - `Trace_samples.xml`

The XML snippets are stored in `src/data/mtconnectXml.js`. They include the relevant `dataItemId` values used by the parser and can be replaced with the full original XML strings later.

## Install

```bash
cd iiot-cnc-dashboard
npm install
```

## Run

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## How To Use

1. Click **Load Current Snapshot** to parse the embedded current MTConnect XML and populate machine status, cycle, production, process, axis, and detail widgets.
2. Click **Load Samples** to parse the embedded samples XML and update the latest spindle speed, cycle time, counters, X/Y axis values, and trajectory plot.
3. Interpret status colors:
   - Green: active or healthy.
   - Yellow/orange: hold, delayed cycle, or warning.
   - Red: alarm or fault.
   - Dark gray: unavailable or missing data.
4. Interpret the trajectory plot:
   - Light gray line: historical X/Y tool path.
   - Small gray points: sample positions.
   - Cyan point: latest X/Y position.
   - Axes are displayed in millimeters.

## Implementation Notes

- The app has no backend and does not load external XML files.
- XML is parsed in-browser with `DOMParser`.
- MTConnect values are selected with `querySelectorAll('[dataItemId="..."]')`.
- Missing values are never coerced to zero; the UI shows `UNAVAILABLE`.
- The trajectory is drawn manually with HTML5 canvas.
- AddressCodes are kept as a known limitation and are not split into individual widgets.

## Testing Notes

The dashboard includes a visible **Phase 4 Test Protocol** table with checks T-01 through T-09:

- Current snapshot SpindleTime equals `85476 s`.
- Sample spindle speed is approximately `2000 rpm`.
- Sample latest X is approximately `-450.6 mm`.
- Sample M30Counter1 equals `5536`.
- Trajectory contains `16` X/Y points.
- Units are visible for rpm, mm, s, and percent widgets.
- ACTIVE plus spindle speed greater than zero maps to green/active.
- Missing sample Z is shown as unavailable.
- Invalid XML is caught without crashing the app.

## Known Limitations

- Data is embedded, not live.
- No server polling is implemented.
- Z may be unavailable in samples.
- AddressCodes are not parsed into individual widgets.
