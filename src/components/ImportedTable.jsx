function ImportedTable({ participants, total, onClear }) {
  const hasParticipants = participants.length > 0

  return (
    <section className="imported-block">
      <div className="imported-header">
        <div>
          <h3>Imported participants</h3>
          <p className="muted">10 останніх імпортованих записів</p>
        </div>
        <div className="imported-actions">
          <span className="badge">Imported total: {total}</span>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={onClear}
            disabled={!hasParticipants}
          >
            Clear imported
          </button>
        </div>
      </div>
      {hasParticipants ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Imported at</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={participant.id}>
                  <td>{index + 1}</td>
                  <td>{participant.fullName}</td>
                  <td>
                    <a href={`mailto:${participant.email}`}>{participant.email}</a>
                  </td>
                  <td>{participant.country}</td>
                  <td>{new Date(participant.importedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="muted">Імпорт ще не виконувався.</p>
      )}
    </section>
  )
}

export default ImportedTable
