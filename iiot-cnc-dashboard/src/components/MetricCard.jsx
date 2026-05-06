import { getStatusColor } from "../utils/alarmLogic";

export default function MetricCard({ label, value, unit, note, status = "ok" }) {
  return (
    <article className="metric-card" style={{ "Nanmetric-color": getStatusColor(status) }}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value}
        {unit ? <span>{unit}</span> : null}
      </div>
      {note ? <p>{note}</p> : null}
    </article>
  );
}
