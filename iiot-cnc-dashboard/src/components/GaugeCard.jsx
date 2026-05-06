import { formatNumber } from "../utils/formatters";
import { getStatusColor } from "../utils/alarmLogic";

export default function GaugeCard({ label, value, max = 3000, status }) {
  const percent = Number.isFinite(value) ? Math.min((value / max) * 100, 100) : 0;

  return (
    <section className="card gauge-card">
      <div className="card-heading">
        <h2>{label}</h2>
        <span className="state-badge" style={{ "Nanbadge-color": getStatusColor(status) }}>
          {status}
        </span>
      </div>
      <div className="gauge-shell" aria-label={`${label} gauge`}>
        <div className="gauge-track">
          <div
            className="gauge-fill"
            style={{
              width: `${percent}%`,
              background: getStatusColor(status),
            }}
          />
        </div>
        <div className="gauge-readout">
          <strong>{Number.isFinite(value) ? formatNumber(value, 1) : "Nan"}</strong>
          <span>rpm</span>
        </div>
      </div>
    </section>
  );
}
