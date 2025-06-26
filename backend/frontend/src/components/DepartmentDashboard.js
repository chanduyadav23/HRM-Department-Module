import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DepartmentDashboard() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ dept_name: '', description: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await axios.get('http://localhost:8000/api/departments/');
    setDepartments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/departments/', formData);
      setFormData({ dept_name: '', description: '' });
      fetchDepartments(); // Refresh the list
    } catch (error) {
      alert("Error creating department: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Departments</h2>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Department Name"
            value={formData.dept_name}
            onChange={(e) => setFormData({ ...formData, dept_name: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>
        <button className="btn btn-success">Create Department</button>
      </form>

      {/* Department List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept.id}>
              <td>{index + 1}</td>
              <td>{dept.dept_name}</td>
              <td>{dept.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentDashboard;
