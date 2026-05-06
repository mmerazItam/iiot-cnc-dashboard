import { useState } from "react";
import { scenarioOptions } from "../data/testScenarios.js";

export default function ScenarioSelector({ onLoadScenario }) {
  const [selectedId, setSelectedId] = useState(scenarioOptions[0]?.value ?? "");

  const selectedOption = scenarioOptions.find((option) => option.value === selectedId);

  return (
    <section className="scenario-selector" aria-label="Synthetic test scenario loader">
      <label htmlFor="scenario-select">Synthetic scenario</label>
      <select
        id="scenario-select"
        value={selectedId}
        onChange={(event) => setSelectedId(event.target.value)}
      >
        {scenarioOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="button" className="secondary" onClick={() => onLoadScenario(selectedId)}>
        Load Test Scenario
      </button>
      <span>{selectedOption?.description}</span>
    </section>
  );
}
