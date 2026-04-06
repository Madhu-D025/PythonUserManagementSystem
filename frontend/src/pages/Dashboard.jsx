import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const { get, post, put, remove, loading, error } = useApi();
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchUsers = useCallback(async (hideSpinner = false) => {
    try {
      if (!hideSpinner) setInitialLoading(true);
      const data = await get('/users');
      if (data) setUsers(data);
    } catch (err) {
      // Handled by hook antd toast
    } finally {
      setInitialLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchUsers(false);
  }, [fetchUsers]);

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
        await remove(`/users/${id}`, 'User deleted successfully!');
        // Refresh silently so the table avoids a complete flash
        fetchUsers(true); 
      } catch (err) { }
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingUser) {
        await put(`/users/${editingUser.Id}`, data, 'User updated successfully!');
      } else {
        await post('/users', data, 'User created successfully!');
      }
      setIsFormOpen(false);
      // Refresh silently
      fetchUsers(true);
    } catch (err) {
      // Let the form stay open so user can fix their inputs!
      // The toast from useApi ensures they see the error
    }
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

        {/* Global hook error can sit here as a secondary fallback if needed, but antd covers alerts */}

        {initialLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <UserTable 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
            isActionLoading={loading && !initialLoading}
          />
        )}

        {isFormOpen && (
          <UserForm 
            initialData={editingUser} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
            isSubmitting={loading && !initialLoading}
          />
        )}
      </div>
    </div>
  );
}
