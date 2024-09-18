


'use client'

import { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { Eye, EyeOff, Lock, KeyRound, Save } from 'lucide-react'

interface PasswordData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { oldPassword, newPassword, confirmPassword } = passwordData

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match')
      enqueueSnackbar('New password and confirm password do not match', { variant: 'error' })
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found')

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      enqueueSnackbar('Password updated successfully!', { variant: 'success' })
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err) {
      setError('Failed to update password')
      enqueueSnackbar('Error updating password', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="relative">
              <input
                type={showPasswords[field as keyof typeof showPasswords] ? 'text' : 'password'}
                name={field}
                value={passwordData[field as keyof PasswordData]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 pl-10"
                required
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {field === 'oldPassword' ? (
                  <Lock className="h-5 w-5" />
                ) : (
                  <KeyRound className="h-5 w-5" />
                )}
              </span>
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field as keyof typeof showPasswords)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPasswords[field as keyof typeof showPasswords] ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">{error}</div>
        )}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>Change Password</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}