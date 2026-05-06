export default function ControlButtons({ onLoadCurrent, onLoadSamples, onReset }) {
  return (
    <section className="controls" aria-label="Dashboard controls">
      <button type="button" onClick={onLoadCurrent}>
        Load Current Snapshot
      </button>
      <button type="button" className="secondary" onClick={onLoadSamples}>
        Load Samples
      </button>
      <button type="button" className="ghost" onClick={onReset}>
        Reset Dashboard
      </button>
    </section>
  );
}
