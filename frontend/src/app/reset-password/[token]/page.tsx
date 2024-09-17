// pages/reset-password.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const token  = params.token; // Extract token from query params
  const { enqueueSnackbar } = useSnackbar();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      enqueueSnackbar('Invalid or missing token.', { variant: 'error' });
      router.push('/'); // Redirect to home or appropriate page
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      // Call the backend API to reset the password
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}auth/reset-password/${token}`,
        {  newPassword }
      );

      enqueueSnackbar('Password reset successful', { variant: 'success' });
      router.push('/signin'); // Redirect to signin after successful password reset
    } catch (error:any) {
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to reset password',
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
