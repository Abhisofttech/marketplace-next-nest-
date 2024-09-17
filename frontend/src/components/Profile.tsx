'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        router.push('/signin'); // Redirect if no token is found
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}users/user-detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data); // Set the user data
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data', { variant: 'error' });
      }
    };

    fetchUserData();
  }, [enqueueSnackbar, router]);

  // Update user info
  const handleUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URI}users/update-userInfo`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to update profile', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
