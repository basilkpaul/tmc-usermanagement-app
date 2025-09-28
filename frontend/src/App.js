import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ firstname: '', lastname: '', age: '', dob: '' });

  const getApiUrl = () => {
    const backendHost = window.location.host.replace('-3000', '-8000');
    return `${window.location.protocol}//${backendHost}`;
  };  
  const API_URL = getApiUrl();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users/`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async e => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ firstname: '', lastname: '', age: '', dob: '' });
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`${API_URL}/user?user_id=${id}`, { method: 'DELETE' });
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };  
  function formatDateDMY(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
  };
  return (
    <div className="app-container">
      <h1>TMC User Management</h1>
      <h2>Add User</h2>
      <form onSubmit={handleAdd} className='tmc-form'>
        <input className='tmc-input-custom' name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required  />
        <input className='tmc-input-custom' name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required  />
        <input className='tmc-input-custom' name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required />
        <input className='tmc-input-custom' name="dob" placeholder="Date of Birth" type="date" value={form.dob} onChange={handleChange} required />
        <button className='tmc-submit-btn' type="submit" >Add</button>
      </form>
      <h2>User List</h2>
      <table className='tmc-user-tbl'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td className='tmc-user-names'>{user.firstname}</td>
                <td className='tmc-user-names'>{user.lastname}</td>
                <td className='tmc-user-otherfields'>{user.age}</td>
                <td className='tmc-user-otherfields'>{formatDateDMY(user.dob)}</td>                
                <td className='tmc-user-otherfields'>
                  <button onClick={() => handleDelete(user.id)} className='tmc-del-btn'>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className='tmc-no-message'>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;