'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faStar,
    faStarHalf,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

export default function ProductScroller() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef(null)

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const data = await res.json()
                setProducts(data)
            } catch (error) {
                console.error('Error loading products:', error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const scroll = (direction) => {
        if (!scrollRef.current) return
        const width = scrollRef.current.clientWidth
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -width : width,
            behavior: 'smooth',
        })
    }

    const renderCard = (p) => (
        <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="flex-shrink-0 w-52 flex flex-col gap-1 p-4 bg-white border border-white hover:scale-105 transition-transform rounded-lg h-80"
        >
            <div className="relative w-full h-40 mb-2">
                <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    style={{ objectFit: 'contain' }}
                />
            </div>

            <h2 className="text-sm font-semibold line-clamp-2 mb-2 flex-grow">
                {p.title}
            </h2>

            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-0.5 text-xs text-[#5E60CE] mb-1">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalf} />
                        <span className="ml-1 font-bold text-gray-400">
                            {Math.round(p.rating.rate * 10)}% ({p.rating.count})
                        </span>
                    </div>
                    <p className="text-md font-bold text-[#000000]">
                        od ${p.price}
                    </p>
                </div>
            </div>
        </Link>
    )

    const renderSkeleton = (key) => (
        <div
            key={key}
            className="flex-shrink-0 w-52 flex flex-col gap-1 p-4 bg-white border border-gray-200 animate-pulse rounded-lg h-80"
        >
            <div className="w-full h-40 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="mt-auto space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-6 bg-gray-200 rounded w-1/4" />
            </div>
        </div>
    )

    return (
        <div className="flex justify-center py-10">
            <div className="flex flex-col w-full max-w-[95rem] mx-auto">
                <div className="py-3 px-4 text-gray-700 text-sm md:text-base sm:px-6 lg:px-8">
                    <h2 className='font-semibold text-2xl'>Zákazníci si tiež dokúpili:</h2>
                </div>

                <div className="hidden 2xl:flex items-center">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Previous"
                        className="flex-shrink-0 h-10 w-10 bg-[#5E60CE] border rounded-3xl shadow ml-2 text-white"
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="overflow-x-hidden scroll-smooth scrollbar-hide flex-1"
                    >
                        <div className="grid grid-flow-col 2xl:auto-cols-[19%] gap-4 py-4 px-2">
                            {loading
                                ? Array.from({ length: 5 }).map((_, i) => renderSkeleton(i))
                                : products.map(renderCard)
                            }
                        </div>
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        aria-label="Next"
                        className="flex-shrink-0 h-10 w-10 bg-[#5E60CE] border rounded-3xl shadow ml-2 text-white"
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                <div className="2xl:hidden overflow-x-auto scroll-smooth scrollbar-auto flex space-x-4 py-4 px-2">
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => renderSkeleton(i))
                        : products.map(renderCard)
                    }
                </div>
            </div>
        </div>
    )
}
