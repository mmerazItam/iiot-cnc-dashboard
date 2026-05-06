import { useEffect, useRef } from "react";

const X_RANGE = [-500, -300];
const Y_RANGE = [-200, -50];

export default function TrajectoryCanvas({ trajectory, width = 520, height = 240 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ratio = window.devicePixelRatio || 1;
    const margin = 24;
    const drawWidth = width * ratio;
    const drawHeight = height * ratio;

    canvas.width = drawWidth;
    canvas.height = drawHeight;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#08111f";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#263244";
    ctx.lineWidth = 1;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    ctx.fillStyle = "#93a4bb";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText("X Position (mm)", width / 2 - 42, height - 6);
    ctx.save();
    ctx.translate(12, height / 2 + 42);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Y Position (mm)", 0, 0);
    ctx.restore();

    ctx.fillText(`${X_RANGE[0]} mm`, margin, height - margin + 16);
    ctx.fillText(`${X_RANGE[1]} mm`, width - margin - 54, height - margin + 16);
    ctx.fillText(`${Y_RANGE[1]} mm`, margin + 4, margin + 14);
    ctx.fillText(`${Y_RANGE[0]} mm`, margin + 4, height - margin - 8);

    const points = (trajectory || []).filter(
      (point) => Number.isFinite(point.x) && Number.isFinite(point.y)
    );

    if (points.length === 0) {
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "15px Inter, system-ui, sans-serif";
      ctx.fillText("No trajectory data available", width / 2 - 92, height / 2);
      return;
    }

    const mapX = (x) =>
      margin + ((x - X_RANGE[0]) / (X_RANGE[1] - X_RANGE[0])) * (width - margin * 2);

    const mapY = (y) => {
      // CNC coordinates are in millimeters. The canvas origin is top-left, so
      // Y is inverted to make larger machine Y values appear higher on screen.
      const normalized = (y - Y_RANGE[0]) / (Y_RANGE[1] - Y_RANGE[0]);
      return height - margin - normalized * (height - margin * 2);
    };

    ctx.beginPath();
    points.forEach((point, index) => {
      const px = mapX(point.x);
      const py = mapY(point.y);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();

    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(mapX(point.x), mapY(point.y), 3, 0, Math.PI * 2);
      ctx.fillStyle = "#94a3b8";
      ctx.fill();
    });

    const start = points[0];
    const latest = points.at(-1);

    ctx.fillStyle = "#f8fafc";
    ctx.fillText("Start", mapX(start.x) + 7, mapY(start.y) - 7);

    ctx.beginPath();
    ctx.arc(mapX(latest.x), mapY(latest.y), 6, 0, Math.PI * 2);
    ctx.fillStyle = "#22d3ee";
    ctx.fill();
    ctx.fillText("Latest", mapX(latest.x) + 9, mapY(latest.y) + 4);
  }, [trajectory, width, height]);

  return (
    <section className="card trajectory-card">
      <div className="card-heading">
        <h2>Motion / Trajectory</h2>
        <span>{trajectory?.length || 0} points</span>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: `${width}px`, height: "auto" }}
        aria-label="X and Y CNC trajectory plot"
      />
    </section>
  );
}
