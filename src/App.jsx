import { useEffect, useState } from 'react';
import './App.css';
import { db, initDB } from './db';
import PatientTable from './components/PatientTable';

function App() {
  const [patients, setPatients] = useState([]);
  const [showModal, setModalShow] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
  });
  
  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await fetchPatients();
      } catch (error) {
        console.error('[App] Error during initialization:', error);
      }
    })();
  }, []);

  const fetchPatients = async () => {
    try {
      console.log('[App] Executing SELECT query...');
      const result = await db.query('SELECT * FROM patients;');
      console.log('[App] Query result:', result);
      setPatients(result.rows);
    } catch (error) {
      console.error('[App] Error fetching patients:', error);
    }
  };

  const handleImportClick = () => {
    setModalShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, gender } = patientDetails;
    console.log(patientDetails);
    
    await db.exec(`
      INSERT INTO patients (name, age, gender)
      VALUES ('${name}', ${Number(age)}, '${gender}');
    `);
    
    setPatientDetails({ name: '', age: '', gender: '' });
    setModalShow(false);
    fetchPatients(); // refresh patient list
  };

  return (
    <div className="container">
      <nav className="navbar">
        <span className="nav-header">Welcome to Patient Management System</span>
        <div className="navbar-button">
          <button className="register-button" onClick={handleImportClick}>
            Register
          </button>
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setModalShow(false)}>
              ✖
            </button>
            <h1 className="text-2xl font-bold mb-4">Patient Registration</h1>
            <form className="mb-4 space-y-2" onSubmit={handleSubmit}>
              <input
                name="name"
                value={patientDetails.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="border p-2"
              />
              <input
                name="age"
                value={patientDetails.age}
                onChange={handleChange}
                placeholder="Age"
                type="number"
                required
                className="border p-2 w-full text-black"
              />
              <select
                name="gender"
                value={patientDetails.gender}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Register
              </button>
            </form>
          </div>
        </div>
      )}

      <PatientTable patients={patients} />
    </div>
  );
}

export default App;
