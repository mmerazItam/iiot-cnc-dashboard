import { useEffect, useRef } from "react";

const X_RANGE = [-500, -300];
const Y_RANGE = [-200, -50];

export default function TrajectoryCanvas({
  trajectory,
  currentIndex,
  showFullPath = true,
  width = 300,
  height = 300,
}) {
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
    const plotSize = Math.min(width, height) - margin * 2;
    const plotLeft = (width - plotSize) / 2;
    const plotTop = (height - plotSize) / 2;
    const plotBottom = plotTop + plotSize;
    const plotRight = plotLeft + plotSize;

    ctx.strokeStyle = "#263244";
    ctx.lineWidth = 1;
    ctx.strokeRect(plotLeft, plotTop, plotSize, plotSize);

    // Draw a square reference grid so the trajectory reads like an industrial
    // position plot instead of a free-floating line chart.
    ctx.strokeStyle = "#1c2a3b";
    for (let index = 1; index < 5; index += 1) {
      const step = (plotSize / 5) * index;
      ctx.beginPath();
      ctx.moveTo(plotLeft + step, plotTop);
      ctx.lineTo(plotLeft + step, plotBottom);
      ctx.moveTo(plotLeft, plotTop + step);
      ctx.lineTo(plotRight, plotTop + step);
      ctx.stroke();
    }

    ctx.fillStyle = "#93a4bb";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText("X Position (mm)", width / 2 - 42, height - 5);
    ctx.save();
    ctx.translate(11, height / 2 + 42);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Y Position (mm)", 0, 0);
    ctx.restore();

    ctx.fillText(`${X_RANGE[0]} mm`, plotLeft, plotBottom + 14);
    ctx.fillText(`${X_RANGE[1]} mm`, plotRight - 54, plotBottom + 14);
    ctx.fillText(`${Y_RANGE[1]} mm`, plotLeft + 4, plotTop + 14);
    ctx.fillText(`${Y_RANGE[0]} mm`, plotLeft + 4, plotBottom - 8);

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
      plotLeft + ((x - X_RANGE[0]) / (X_RANGE[1] - X_RANGE[0])) * plotSize;

    const mapY = (y) => {
      // CNC coordinates are in millimeters. The canvas origin is top-left, so
      // Y is inverted to make larger machine Y values appear higher on screen.
      const normalized = (y - Y_RANGE[0]) / (Y_RANGE[1] - Y_RANGE[0]);
      return plotBottom - normalized * plotSize;
    };

    const drawPath = (pathPoints, strokeStyle, lineWidth) => {
      if (pathPoints.length < 2) return;

      ctx.beginPath();
      pathPoints.forEach((point, index) => {
        const px = mapX(point.x);
        const py = mapY(point.y);
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    if (showFullPath) {
      drawPath(points, "#8b98aa", 1.5);
    }

    const activeIndex = Number.isInteger(currentIndex)
      ? Math.min(Math.max(currentIndex, 0), points.length - 1)
      : points.length - 1;
    const completedPath = points.slice(0, activeIndex + 1);

    // The completed path is a derived slice; it does not mutate the original
    // MTConnect trajectory array.
    drawPath(completedPath, "#38bdf8", 2.6);

    points.forEach((point) => {
      const px = mapX(point.x);
      const py = mapY(point.y);
      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = point.alarm ? "#ef4444" : point.warning ? "#f59e0b" : "#94a3b8";
      ctx.fill();
    });

    const start = points[0];
    const final = points.at(-1);
    const current = points[activeIndex];

    ctx.fillStyle = "#f8fafc";
    ctx.fillText("Start", mapX(start.x) + 7, mapY(start.y) - 7);
    ctx.fillText("Final", mapX(final.x) + 7, mapY(final.y) + 13);

    const currentX = mapX(current.x);
    const currentY = mapY(current.y);
    const currentIsAlarm = Boolean(current.alarm);
    const currentIsWarning = Boolean(current.warning);

    ctx.beginPath();
    // The replay cursor is normally cyan. Warning and alarm points keep the
    // same currentIndex behavior, but change color so the operator can see the
    // state transition directly on the tool path.
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
    ctx.fillStyle = currentIsAlarm ? "#ef4444" : currentIsWarning ? "#f59e0b" : "#22d3ee";
    ctx.fill();

    if (currentIsAlarm || currentIsWarning) {
      ctx.beginPath();
      ctx.arc(currentX, currentY, currentIsAlarm ? 11 : 9, 0, Math.PI * 2);
      ctx.strokeStyle = currentIsAlarm ? "#fecaca" : "#fde68a";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.fillStyle = currentIsAlarm ? "#fecaca" : currentIsWarning ? "#fde68a" : "#e0faff";
    ctx.fillText(currentIsAlarm ? "ALARM" : currentIsWarning ? "WARN" : "Tool", currentX + 9, currentY + 4);
  }, [currentIndex, showFullPath, trajectory, width, height]);

  return (
    <section className="card trajectory-card">
      <div className="card-heading">
        <h2>Motion / Trajectory</h2>
        <span>{trajectory?.length || 0} points</span>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: `${width}px`, aspectRatio: "1 / 1" }}
        aria-label="X and Y CNC trajectory plot"
      />
    </section>
  );
}
