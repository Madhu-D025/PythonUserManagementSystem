import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function UserForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData || { Status: 'Active' }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ Status: 'Active' });
    }
  }, [initialData, reset]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit User' : 'Add New User'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 relative">
          {/* Form Content */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
              <input 
                {...register('Username', { required: 'Username is required' })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="johndoe"
              />
              {errors.Username && <span className="text-red-500 text-xs mt-1 block">{errors.Username.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                {...register('Email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="john@example.com"
              />
              {errors.Email && <span className="text-red-500 text-xs mt-1 block">{errors.Email.message}</span>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                {...register('PhoneNumber')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input 
                {...register('Department')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Engineering"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input 
                type="number" 
                step="0.01"
                {...register('Salary')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="50000"
              />
            </div>

            {/* Date of Joining */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
              <input 
                type="date"
                {...register('DateOfJoining')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                {...register('Status')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea 
                {...register('Address')}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="123 Main St..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors flex items-center shadow disabled:opacity-75 disabled:cursor-wait"
            >
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {initialData ? 'Save Changes' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
