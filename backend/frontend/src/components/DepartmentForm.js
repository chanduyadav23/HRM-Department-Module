import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get(`/api/departments/${id}/`).then((res) => {
      setFormData(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/api/departments/${id}/`, formData);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Department</h2>
      <input
        type="text"
        name="name"
        placeholder="Department Name"
        value={formData.name}
        onChange={handleChange}
        className="block w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Department Description"
        value={formData.description}
        onChange={handleChange}
        className="block w-full mb-3 px-4 py-2 border rounded"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
    </div>
  );
}

export default UpdateDepartment;
