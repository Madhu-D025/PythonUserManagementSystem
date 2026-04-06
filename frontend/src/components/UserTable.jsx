import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function UserTable({ users, onEdit, onDelete, isActionLoading }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
        No users found. Add a user to get started!
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden transition-opacity ${isActionLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Username</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Email</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Phone</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Department</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Salary</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.Id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-800">{user.Username}</td>
                <td className="p-4 text-gray-600">{user.Email}</td>
                <td className="p-4 text-gray-600">{user.PhoneNumber || '-'}</td>
                <td className="p-4 text-gray-600">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.Department || 'N/A'}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{user.Salary ? `$${user.Salary}` : '-'}</td>
                <td className="p-4 text-gray-600">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.Status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.Status || 'Active'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900 p-2 rounded hover:bg-indigo-50 transition-colors mr-2"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(user.Id)}
                    className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
