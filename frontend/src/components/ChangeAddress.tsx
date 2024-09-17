

'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setAddresses } from '@/redux/cartSlice';

interface Address {
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const ChangeAddress = () => {
  const [address, setAddress] = useState<Address>({
    houseNumber: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}users/user-detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.address) {
          setAddress(response.data.address);
        }
      } catch (err) {
        setError('Failed to fetch user details');
        enqueueSnackbar('Error fetching user details', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [enqueueSnackbar]);





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URI}users/update-address`, address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        dispatch(setAddresses(address));
        const formatAddress = (address: any): string => {
          return `${address.houseNumber}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`;
        };
        
        const formattedAddress = formatAddress(address);
        console.log(formattedAddress);
        localStorage.setItem('address',formattedAddress)
      enqueueSnackbar('Address updated successfully!', { variant: 'success' });
    } catch (err) {
      setError('Failed to update address');
      enqueueSnackbar('Error updating address', { variant: 'error' });
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Change Address</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">House Number</label>
          <input
            type="text"
            name="houseNumber"
            value={address.houseNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update Address
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default ChangeAddress;
