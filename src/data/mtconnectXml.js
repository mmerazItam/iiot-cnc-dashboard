import traceCurrentXml from "../../lib/Trace_current.xml?raw";
import traceProbeXml from "../../lib/Trace_probe.xml?raw";
import traceSamplesXml from "../../lib/Trace_samples.xml?raw";

// Vite's ?raw imports bundle these XML files as strings at build time.
// That keeps the app frontend-only and avoids fetch/backend dependencies,
// while using the complete real MTConnect traces from the local lib folder.
export const TRACE_CURRENT_XML = traceCurrentXml;
export const TRACE_PROBE_XML = traceProbeXml;
export const TRACE_SAMPLES_XML = traceSamplesXml;

// Malformed on purpose: T-09 verifies that parser failures are surfaced in the
// UI without breaking the dashboard render tree.
export const INVALID_XML = `<MTConnectStreams><Header creationTime="invalid"><Streams>`;
