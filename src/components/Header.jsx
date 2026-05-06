import { safeValue } from "../utils/xmlParsers";

export default function Header({ source, creationTime }) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">MTConnect IIoT Monitoring</p>
        <h1>Haas TM-1P Production Dashboard</h1>
        <p className="subtitle">Machine: TM-1P | SN: 1131432 | MTConnect IIoT Monitoring</p>
      </div>
      <div className="header-meta" aria-label="Loaded XML metadata">
        <span>Source: {safeValue(source, "none")}</span>
        <span>creationTime: {safeValue(creationTime)}</span>
      </div>
    </header>
  );
}
