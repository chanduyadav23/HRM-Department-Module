import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DepartmentDashboard() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ dept_name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const isAdmin = true; // ✅ Set false to hide form & block edit/delete

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/departments/');
      setDepartments(res.data);
    } catch (error) {
      alert("Error fetching departments: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/departments/${editingId}/`, formData);
      } else {
        await axios.post('/api/departments/', formData);
      }
      setFormData({ dept_name: '', description: '' });
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      alert("Error submitting: " + error.message);
    }
  };

  const handleEdit = (dept) => {
    setFormData({ dept_name: dept.dept_name, description: dept.description });
    setEditingId(dept.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`/api/departments/${id}/`);
        fetchDepartments();
      } catch (error) {
        alert("Error deleting: " + error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Departments</h2>

      {/* Create / Edit Form */}
      {isAdmin && (
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
          <button className="btn btn-primary">{editingId ? 'Update' : 'Create'} Department</button>
          {editingId && (
            <button
              className="btn btn-secondary ms-2"
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ dept_name: '', description: '' });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* Department Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Description</th>
            {isAdmin && <th>Edit</th>}
            {isAdmin && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept.id}>
              <td>{index + 1}</td>
              <td>{dept.dept_name}</td>
              <td>{dept.description}</td>
              {isAdmin && (
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(dept)}>Edit</button>
                </td>
              )}
              {isAdmin && (
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(dept.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentDashboard;
