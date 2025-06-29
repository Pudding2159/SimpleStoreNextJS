'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import SizeQuantityCounter from '@/app/components/SizeQuantitySelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductTabs from '@/app/components/ProductTabs';
import ProductScroller from '@/app/components/ProductScroller';
import {
  faStar,
  faStarHalf,
  faCheck,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isNaN(Number(id))) {
      setError(`Nesprávne ID produktu: ${id}`);
      setIsLoading(false);
      return;
    }

    fetch(`https://fakestoreapi.com/products/${id}`, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`Chyba pri načítaní produktu s ID: ${id}`);
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);




  const renderSkeleton = () => (
    <main className="flex flex-col min-h-screen animate-pulse">
      <Header />
      <div className="w-full max-w-[95rem] mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex w-full md:w-1/3 h-64 bg-gray-200 rounded" />
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="h-8 bg-gray-200 w-3/4 rounded" />
          <div className="h-6 bg-gray-200 w-1/2 rounded" />
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 w-1/3 rounded" />
            <div className="h-4 bg-gray-200 w-1/4 rounded" />
          </div>
          <div className="h-40 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-6 bg-gray-200 w-1/4 rounded mt-auto" />
        </div>
      </div>
      <div className="px-4">
        <ProductScroller />
      </div>
      <Footer />
    </main>
  );

  if (isLoading) return renderSkeleton();
  if (error) return <p className="p-8 text-red-500 font-semibold">{error}</p>;

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <nav
        className="mx-auto w-full max-w-[95rem] py-3 px-4 text-gray-700 text-sm md:text-base sm:gap-x-3  sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="flex space-x-1">
          <li>
            <a href="/" className="hover:underline">Product catalog »</a>
          </li>
          <li aria-current="page" className="font-semibold">{product.category}</li>
        </ol>
      </nav>

      <article className="w-full max-w-[95rem] mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex relative w-full md:w-1/3 h-80">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
            className="h-full w-full"
            priority
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h1 className="text-xl md:text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-1 text-sm text-[#5E60CE]">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalf} />
            <span className="ml-2 text-gray-400 text-xs md:text-base font-bold">
              90% ({product.rating.count} evaluations)
            </span>
          </div>

          <dl className="text-gray-800 space-y-1 text-sm">
            <div className="flex">
              <p className="font-semibold mr-2">Manufacturer:</p>
              <a href="#" className="underline cursor-pointer">
                Simple Product Co.
              </a>
            </div>
            <div className="flex">
              <dt className="font-semibold mr-2">Category:</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>

          <div className="flex md:hidden relative w-full h-64 mb-4">
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              className="h-full w-full"
              priority
            />
          </div>

          <p className="text-gray-800 text-sm md:text-base xl:text-lg">{product.description}</p>

          <div className="flex gap-2 mb-4">
            <span className="bg-black text-white text-sm font-semibold uppercase px-2 py-1 rounded-sm">
              In stock
            </span>
            <span className="bg-[#5E60CE] text-white text-sm font-semibold px-2 py-1 rounded-sm uppercase">
              One-day delivery
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t max-w-lg">
            <p className="text-2xl font-bold text-[#000000]">
              {product.price.toFixed(2)} $
            </p>
            <div className="flex flex-col text-xs font-semibold text-gray-800 text-right space-y-1">
              <span>Delivery: from1,90 €</span>
              <span>Free with purchase over 60,00 €</span>
              <span className="underline cursor-pointer">
                Free return shipping
              </span>
            </div>
          </div>

          <SizeQuantityCounter
            sizes={["S", "M", "L", "XL"]}
            initialSize="L"
            initialQuantity={1}
          />

          <button className='bg-[#5E60CE] text-white rounded px-2 py-1 flex flex-row justify-center items-center gap-4 w-1/2'>
            <span className='text-lg font-semibold'>
              Add to cart
            </span>
            <FontAwesomeIcon icon={faCartShopping} className="mr-2 text-lg" />
          </button>

        </div>
      </article>
      <ProductScroller />
      <ProductTabs product={product} />
      <Footer />
    </main>
  );
}
