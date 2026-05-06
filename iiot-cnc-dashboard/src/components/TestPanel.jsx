export default function TestPanel({ tests }) {
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
    </section>
  );
}
