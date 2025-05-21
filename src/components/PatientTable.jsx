const PatientTable = ({ patients }) => {
  if (!patients || patients.length === 0) {
    return <p className="no-patients">No patients found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(({ id, name, age, gender }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
