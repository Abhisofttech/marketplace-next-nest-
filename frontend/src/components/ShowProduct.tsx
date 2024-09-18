


"use client"

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Search, ShoppingCart, Star, Loader } from 'lucide-react'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
  description:string
}

export default function ShowProduct() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const [isToken , setIsToken]=useState(false)

  useEffect(() => {
    const token=localStorage.getItem('token');
    if(token){
      setIsToken(true)
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}products/get-products`)
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products', error)
        enqueueSnackbar('Failed to load products', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [enqueueSnackbar])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query)
    )
    setFilteredProducts(filtered)
  }

  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem('token')
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}cart/add-item`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      enqueueSnackbar('Item added to cart successfully!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add item to cart', { variant: 'error' })
      console.error('Error adding item to cart', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <section className="py-3 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h2>
        
        <div className="relative mb-8 max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                 
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="text-indigo-600 font-bold mb-4">${product.price.toFixed(2)}</p>
                  {isToken && 
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to cart
                  </button>
}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}