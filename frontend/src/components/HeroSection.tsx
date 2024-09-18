'use client'

import { useState, useEffect } from 'react'
import Slider from './Slider'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const images = [
    '/images/banner5.jpg',
    '/images/banner6.jpg',
    '/images/banner4.jpg',
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <Slider images={images} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-sm p-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-down">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Our Store
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium mb-8 max-w-xl sm:max-w-2xl px-4 animate-fade-in-up">
          Discover a world of amazing products curated just for you!
        </p>
        <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5" />
          <span> <Link href='signin'>Shop Now</Link></span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  )
}