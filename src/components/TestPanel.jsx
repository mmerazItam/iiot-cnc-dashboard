export default function TestPanel({
  tests,
  scenarioTests = [],
  replayTests = [],
  movingAlarmTests = [],
}) {
  return (
    <section className="card test-panel">
      <div className="card-heading">
        <h2>Phase 4 Test Protocol</h2>
        <span>Dynamic checks</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Input</th>
              <th>Expected Result</th>
              <th>Actual Result</th>
              <th>Pass/Fail</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.description}</td>
                <td>{test.input}</td>
                <td>{test.expected}</td>
                <td>{test.actual}</td>
                <td>
                  <span className={`test-result ${test.result.toLowerCase().replaceAll(" ", "-")}`}>
                    {test.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="scenario-tests-block">
        <div className="card-heading scenario-tests-heading">
          <h2>Synthetic Scenario Tests</h2>
          <span>{scenarioTests.length} scenarios</span>
        </div>
        <div className="table-wrap scenario-table-wrap">
          <table className="scenario-tests-table">
            <thead>
              <tr>
                <th>Scenario name</th>
                <th>Expected state</th>
                <th>Expected color</th>
                <th>Critical expected behavior</th>
                <th>Actual state</th>
                <th>Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {scenarioTests.map((scenario) => (
                <tr key={scenario.id}>
                  <td>{scenario.name}</td>
                  <td>{scenario.expectedState}</td>
                  <td>{scenario.expectedColor}</td>
                  <td>{scenario.criticalBehavior}</td>
                  <td>{scenario.actualState}</td>
                  <td>
                    <span
                      className={`test-result ${scenario.result
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {scenario.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="simulated-motion-block">
        <div className="card-heading scenario-tests-heading">
          <h2>Simulated Motion Test</h2>
          <span>{replayTests.length} checks</span>
        </div>
        <div className="table-wrap replay-table-wrap">
          <table className="replay-tests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Expected Result</th>
                <th>Actual Result</th>
                <th>Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {replayTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.id}</td>
                  <td>{test.description}</td>
                  <td>{test.expected}</td>
                  <td>{test.actual}</td>
                  <td>
                    <span
                      className={`test-result ${test.result
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {test.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="moving-alarm-block">
        <div className="card-heading scenario-tests-heading">
          <h2>Moving Alarm Servo Overload Tests</h2>
          <span>{movingAlarmTests.length} checks</span>
        </div>
        <div className="table-wrap moving-alarm-table-wrap">
          <table className="moving-alarm-tests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Expected Result</th>
                <th>Actual Result</th>
                <th>Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {movingAlarmTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.id}</td>
                  <td>{test.description}</td>
                  <td>{test.expected}</td>
                  <td>{test.actual}</td>
                  <td>
                    <span
                      className={`test-result ${test.result
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {test.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
