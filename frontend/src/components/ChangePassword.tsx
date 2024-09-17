'use client'

import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      enqueueSnackbar('New password and confirm password do not match', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar('Password updated successfully!', { variant: 'success' });
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Failed to update password');
      enqueueSnackbar('Error updating password', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
