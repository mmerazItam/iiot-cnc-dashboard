import { getStatusColor } from "../utils/alarmLogic";
import { safeValue } from "../utils/xmlParsers";

export default function StatusCard({ title, state, rows }) {
  return (
    <section className="card status-card">
      <div className="card-heading">
        <h2>{title}</h2>
        <span
          className="state-badge"
          style={{ "--badge-color": getStatusColor(state.status) }}
        >
          {state.label}
        </span>
      </div>
      <dl className="status-list">
        {rows.map((row) => (
          <div key={row.label} className="status-row">
            <dt>{row.label}</dt>
            <dd>{safeValue(row.value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
