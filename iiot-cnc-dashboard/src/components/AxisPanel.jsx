import { formatPosition } from "../utils/formatters";

export default function AxisPanel({ x, y, z, zNote }) {
  const axes = [
    { label: "X Position", value: formatPosition(x) },
    { label: "Y Position", value: formatPosition(y) },
    { label: "Z Position", value: Number.isFinite(z) ? formatPosition(z) : "UNAVAILABLE" },
  ];

  return (
    <section className="card axis-panel">
      <div className="card-heading">
        <h2>Axis Values</h2>
      </div>
      <div className="axis-grid">
        {axes.map((axis) => (
          <article key={axis.label} className="axis-card">
            <span>{axis.label}</span>
            <strong>{axis.value}</strong>
            {axis.label === "Z Position" && zNote ? <p>{zNote}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
