import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faStarHalf,
    faCheck,
    faBasketShopping,
    faTrash,
    faFilter,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import '../slider.css';

export const revalidate = 60;

export default function Catalogue() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        priceMin: 0,
        priceMax: 0,
        categories: []
    });
    const [priceMinInput, setPriceMinInput] = useState("");
    const [priceMaxInput, setPriceMaxInput] = useState("");
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [maxLimit, setMaxLimit] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const minGap = 0;

    const sortOptions = [
        { value: 'price_desc', label: 'Expensive' },
        { value: 'price_asc', label: 'Cheapest' },
        { value: 'popular', label: 'Total reviews' }
    ];

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data = await res.json();
                const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
                const withReviews = data.map(p => ({ ...p, reviewsCount: rand(50, 500) }));

                setProducts(withReviews);

                const computedMax = Math.max(...withReviews.map(p => p.price));
                setMaxLimit(computedMax);
                setFilters(prev => ({ ...prev, priceMax: computedMax }));
                setPriceMinInput("");
                setPriceMaxInput(computedMax.toFixed(2));
            } catch (err) {
                console.error('Ошибка загрузки продуктов:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const handleMinSlider = val => {
        const newMin = Math.min(val, filters.priceMax - minGap);
        setFilters(prev => ({ ...prev, priceMin: newMin }));
        setPriceMinInput(newMin.toFixed(2));
    };
    const handleMaxSlider = val => {
        const newMax = Math.max(val, filters.priceMin + minGap);
        setFilters(prev => ({ ...prev, priceMax: newMax }));
        setPriceMaxInput(newMax.toFixed(2));
    };

    const applyMinInput = () => {
        const raw = priceMinInput.trim() === '' ? 0 : parseFloat(priceMinInput);
        handleMinSlider(isNaN(raw) ? 0 : raw);
    };
    const applyMaxInput = () => {
        const raw = priceMaxInput.trim() === '' ? 0 : parseFloat(priceMaxInput);
        handleMaxSlider(isNaN(raw) ? 0 : raw);
    };

    const toggleCategory = cat => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };
    const onSortClick = value =>
        setSortOption(prev => (prev === value ? '' : value));
    const onReset = () => {
        setFilters({ priceMin: 0, priceMax: maxLimit, categories: [] });
        setPriceMinInput("");
        setPriceMaxInput(maxLimit.toFixed(2));
        setSortOption('');
    };

    const filtered = products.filter(p => {
        const { priceMin, priceMax, categories } = filters;
        if (p.price < priceMin || p.price > priceMax) return false;
        if (categories.length > 0 && !categories.includes(p.category))
            return false;
        return true;
    });
    const sorted = () => {
        const res = [...filtered];
        if (sortOption === 'price_asc') res.sort((a, b) => a.price - b.price);
        if (sortOption === 'price_desc') res.sort((a, b) => b.price - a.price);
        if (sortOption === 'popular')
            res.sort((a, b) => b.reviewsCount - a.reviewsCount);
        return res;
    };

    const allCats = Array.from(new Set(products.map(p => p.category)));
    const skeletonCount = 20;
    const miniskeletonCount = 4;
    const minPercent = (filters.priceMin / maxLimit) * 100;
    const maxPercent = (filters.priceMax / maxLimit) * 100;

    return (
        <main className="px-8 py-20 flex justify-center items-start">
            <div className="container mx-auto max-w-[95rem] flex flex-col lg:flex-row gap-8 pt-5 lg:pt-0">
                <div className="lg:hidden w-full mb-4 flex flex-col justify-start items-start gap-4">
                    <button
                        onClick={() => setShowFilters(prev => !prev)}
                        className="flex items-center px-4 py-2 bg-[#ff5c3b] text-white rounded-sm"
                    >
                        <FontAwesomeIcon
                            icon={showFilters ? faTimes : faFilter}
                            className="mr-2"
                        />
                        {showFilters ? 'Skryť filtre' : 'Zobraziť filtre'}
                    </button>
                    <div className="flex flex-wrap gap-2">
                        {sortOptions.map(opt => {
                            const active = sortOption === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => onSortClick(opt.value)}
                                    className={`flex items-center px-3 py-1 rounded-sm font-medium text-sm ${active
                                        ? 'bg-[#5E60CE] text-white'
                                        : 'bg-slate-900 hover:bg-black text-white'
                                        }`}
                                >
                                    {opt.label}
                                    {active && (
                                        <FontAwesomeIcon icon={faCheck} className="ml-1" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                </div>

                <aside
                    className={`${showFilters ? 'block' : 'hidden'
                        } w-full lg:w-1/4 lg:block`}
                >
                    <div className="sticky top-10 bg-gray-50 p-6 shadow rounded-xl border border-gray-400">

                        <h1 className="text-xl font-bold mb-6 text-black">
                            Cenové Filtre
                        </h1>

                        <div className="mb-6 hidden lg:flex flex-wrap gap-2">
                            {sortOptions.map(opt => {
                                const active = sortOption === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => onSortClick(opt.value)}
                                        className={`flex items-center px-4 py-1 rounded-sm font-medium ${active
                                            ? 'bg-[#5E60CE] text-white'
                                            : 'bg-slate-900 hover:bg-black text-white'
                                            }`}
                                    >
                                        {opt.label}
                                        {active && (
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="ml-2"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 font-medium select-none">Price from – to</label>
                            <div className="relative slider-container h-[18px]">
                                <input
                                    type="range"
                                    min={0}
                                    max={maxLimit}
                                    step={0.01}
                                    value={filters.priceMin}
                                    onChange={e => handleMinSlider(+e.target.value)}
                                    className="absolute w-full"
                                />
                                <input
                                    type="range"
                                    min={0}
                                    max={maxLimit}
                                    step={0.01}
                                    value={filters.priceMax}
                                    onChange={e => handleMaxSlider(+e.target.value)}
                                    className="absolute w-full"
                                />
                                <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded -translate-y-1/2 overflow-hidden">
                                    <div
                                        className="absolute h-full bg-gradient-to-r from-[#90e0ef] to-[#023e8a] rounded overflow-hidden"
                                        style={{
                                            left: `${minPercent}%`,
                                            right: `${100 - maxPercent}%`
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4 select-none">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="price-min"
                                        className="mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Cena od
                                    </label>
                                    <input
                                        id="price-min"
                                        type="number"
                                        step={1}
                                        value={priceMinInput}
                                        placeholder="0"
                                        onChange={e => setPriceMinInput(e.target.value)}
                                        onBlur={applyMinInput}
                                        className="w-24 border rounded px-2 py-1"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="price-max"
                                        className="mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Do
                                    </label>
                                    <input
                                        id="price-max"
                                        type="number"
                                        step={1}
                                        value={priceMaxInput}
                                        placeholder={maxLimit.toFixed(2)}
                                        onChange={e => setPriceMaxInput(e.target.value)}
                                        onBlur={applyMaxInput}
                                        className="w-24 border rounded px-2 py-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4 text-black">
                                Kategórie
                            </h2>
                            {loading ? (
                                Array.from({ length: miniskeletonCount }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-1 animate-pulse"
                                    >
                                        <div className="h-5 w-1/3 bg-gray-300 rounded mb-4" />
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col justify-start items-start gap-2 text-xl">
                                    {allCats.map(cat => {
                                        const active = filters.categories.includes(cat);
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => toggleCategory(cat)}
                                                className={`px-4 py-2 rounded-sm text-sm flex justify-start items-center font-medium ${active
                                                    ? 'bg-[#5E60CE] text-white'
                                                    : 'bg-slate-900 hover:bg-black text-white'
                                                    }`}
                                            >
                                                {cat}
                                                {active && (
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        className="ml-2"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onReset}
                            className="w-full py-2 bg-[#5e60ce] text-white rounded-sm hover:bg-black transition flex justify-center items-center gap-2 border-2 border-gray-200 hover:border-blue-500"
                        >
                            Vymazať filtre{' '}
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="h-4 w-4"
                            />
                        </button>
                    </div>
                </aside>

                <div className="flex flex-col w-full lg:w-2/3">
                    <p className="font-semibold uppercase pb-5 text-2xl text-[#000000]">
                        Product catalog
                    </p>
                    <section className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {loading
                            ? Array.from({ length: skeletonCount }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="animate-pulse flex flex-col gap-2 border border-gray-200 bg-slate-50 rounded-lg p-4"
                                >
                                    <div className="h-40 bg-gray-300 rounded mb-4" />
                                    <div className="h-6 bg-gray-300 rounded mb-2" />
                                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-4" />
                                </div>
                            ))
                            : sorted().map(p => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.id}`}
                                    className="flex flex-col gap-1 p-4 bg-white border border-white hover:border-[#5e60ce] hover:scale-105 transition rounded-xl h-80"
                                >
                                    <div className="relative w-full h-40 mb-2 z-10">
                                        <Image
                                            src={p.image}
                                            alt={p.title}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                    <h2 className="text-lg font-semibold line-clamp-2 mb-2">
                                        {p.title}
                                    </h2>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="flex items-center gap-0.5 text-xs text-[#5e60ce] mb-1">
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStarHalf} />
                                                <span className="ml-1 font-bold text-gray-400">
                                                    90% ({p.reviewsCount})
                                                </span>
                                            </div>
                                            <p className="text-lg font-bold text-[#000000]">
                                                 ${p.price}
                                            </p>
                                        </div>
                                        <div className="h-10 w-10 bg-[#5e60ce] rounded-lg p-1 flex justify-center items-center text-white border-2 hover:border-black">
                                            <FontAwesomeIcon
                                                icon={faBasketShopping}
                                                className="text-xl"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </section>
                </div>
            </div>
        </main>
    );
}
