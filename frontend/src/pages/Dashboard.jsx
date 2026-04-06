import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import api from '../services/api';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Ensure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        showSuccessMessage('User deleted successfully!');
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user.');
      }
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.Id}`, data);
        showSuccessMessage('User updated successfully!');
      } else {
        await api.post('/users', data);
        showSuccessMessage('User created successfully!');
      }
      setIsFormOpen(false);
      fetchUsers();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to save user.';
      setError(errorMsg);
      alert('Error: ' + errorMsg);
    }
  };

  const showSuccessMessage = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage your team members and their details</p>
          </div>
          <button 
            onClick={handleAddUser}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow transition-colors font-medium"
          >
            <PlusCircle size={20} />
            <span>Add User</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
            <p>{error}</p>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm">
            <p>{successMsg}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <UserTable 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
          />
        )}

        {isFormOpen && (
          <UserForm 
            initialData={editingUser} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        )}
      </div>
    </div>
  );
}
