



"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faStarHalf,
    faCheck,
    faBasketShopping,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function ProductTabs({ product }) {
    const { title, description, category } = product;
    const [activeTab, setActiveTab] = useState("popis");


    const clothingTable = (

        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-[#5E60CE] text-white uppercase text-sm">
                    <th className="px-4 py-2 text-left">Size</th>
                    {["S", "M", "L", "XL", "XXL", "XXXL"].map((sz) => (
                        <th key={sz} className="px-4 py-2 text-left">
                            {sz}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
                {[
                    [
                        "Length",
                        "41,6 cm",
                        "42,3 cm",
                        "43 cm",
                        "43,7 cm",
                        "44,4 cm",
                        "45,1 cm",
                    ],
                    [
                        "Waist circumference",
                        "59 cm",
                        "63 cm",
                        "67 cm",
                        "72 cm",
                        "77 cm",
                        "82 cm",
                    ],
                    [
                        "Hip measurement",
                        "71 cm",
                        "75 cm",
                        "79 cm",
                        "84 cm",
                        "89 cm",
                        "94 cm",
                    ],
                    [
                        "Front seat length",
                        "22 cm",
                        "23 cm",
                        "24 cm",
                        "25 cm",
                        "26 cm",
                        "27 cm",
                    ],
                    [
                        "Rear seat length",
                        "29 cm",
                        "30 cm",
                        "31 cm",
                        "32 cm",
                        "33 cm",
                        "34 cm",
                    ],
                    [
                        "Lower hem circumference",
                        "36,2 cm",
                        "38,6 cm",
                        "41 cm",
                        "43,4 cm",
                        "45,8 cm",
                        "48,2 cm",
                    ],
                ].map(([label, ...vals]) => (
                    <tr key={label} className="border-t">
                        <td className="px-4 py-2 font-medium">{label}</td>
                        {vals.map((v, i) => (
                            <td key={i} className="px-4 py-2">
                                {v}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const electronicsTable = (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-[#5E60CE] text-white uppercase text-sm">
                    <th className="px-4 py-2 text-left">Specification</th>
                    <th className="px-4 py-2 text-left">Value</th>
                </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
                {[
                    ["Rozmery", "150 × 75 × 8 mm"],
                    ["Hmotnosť", "180 g"],
                    ["Výdrž batérie", "24 h"],
                    ["Úložisko", "128 GB"],
                    ["RAM", "6 GB"],
                    ["Displej", "6.5\" OLED"],
                ].map(([label, val]) => (
                    <tr key={label} className="border-t">
                        <td className="px-4 py-2 font-medium">{label}</td>
                        <td className="px-4 py-2">{val}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const jeweleryTable = (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-[#5E60CE] text-white uppercase text-sm">
                    <th className="px-4 py-2 text-left">EU</th>
                    <th className="px-4 py-2 text-left">US</th>
                    <th className="px-4 py-2 text-left">Average (mm)</th>
                    <th className="px-4 py-2 text-left">Circuit (mm)</th>
                </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
                {[
                    ["50", "5", "15.9", "50"],
                    ["52", "6", "16.5", "52"],
                    ["54", "7", "17.3", "54"],
                    ["56", "8", "17.8", "56"],
                    ["58", "9", "18.4", "58"],
                    ["60", "10", "19.1", "60"],
                ].map(([eu, us, diam, obv]) => (
                    <tr key={eu} className="border-t">
                        {[eu, us, diam, obv].map((v, i) => (
                            <td key={i} className="px-4 py-2">{v}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const sizeSpecTable = (() => {
        switch (category) {
            case "men's clothing":
                return clothingTable;
            case "women's clothing":
                return clothingTable;
            case "electronics":
                return electronicsTable;
            case "jewelery":
                return jeweleryTable;
            default:
                return null;
        }
    })();

     const tabs = [
        {
            id: "popis",
            label: "DESCRIPTION",
            content: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-[#5E60CE]">{title}</h2>
                        <p>{description}</p>
                    </div>
                    {sizeSpecTable}
                </div>
            ),
        },
        {
            id: "DETAIL",
            label: "DETAIL",
            content: (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#5E60CE]">Detail for category<strong>{category}</strong>:</h2>
                    <p>{description}</p>
                </div>
            ),
        },
        {
            id: "REVIEWS",
            label: "REVIEWS",
            content: (
                <div className="space-y-4 py-4 text-gray-800">
                    <h2 className="text-2xl font-bold text-[#5E60CE]">User reviews</h2>

                    <div className="border p-4 rounded bg-slate-50 shadow-md">
                        <p className="font-semibold text-xl pb-2">Anna</p>
                        <div className="flex items-center gap-0.5 text-xs text-[#5E60CE] mb-1">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                            <span className="ml-1 font-bold text-gray-400">
                                4.5 / 5
                            </span>
                        </div>
                        <p>Great quality and design, highly recommended!</p>

                    </div>

                    <div className="border p-4 rounded bg-slate-50 shadow-md">
                        <p className="font-semibold text-xl pb-2">Peter</p>
                        <div className="flex items-center gap-0.5 text-xs text-[#5E60CE] mb-1">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <span className="ml-1 font-bold text-gray-400">
                                4 / 5
                            </span>
                        </div>
                        <p>Very comfortable, but there could be more colors.</p>
                    </div>

                </div>
            ),
        },
        {
            id: "PRODUCT QUESTIONS",
            label: "PRODUCT QUESTIONS",
            content: (
                <div className="space-y-4 py-4 text-gray-800">
                    <h2 className="text-2xl font-bold text-[#5E60CE]">User questions </h2>

                    <div className="border p-4 rounded bg-slate-50 shadow-md">
                        <p className="font-semibold text-xl pb-2">Question:</p>

                        <p>Is this product waterproof?</p>

                    </div>
                    <div className="border p-4 rounded bg-slate-50 shadow-md">
                        <p className="font-semibold text-xl pb-2">Answer:</p>

                        <p>Yes, it is resistant to dust and light rain.</p>
                    </div>
                </div>
            ),
        },

    ];

    return (
        <div className="w-full mx-auto max-w-[92rem]  px-5  ">
            <nav className=" flex flex-wrap  mb-6 gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 px-4 py-2 font-semibold uppercase ${activeTab === tab.id
                            ? "bg-[#5E60CE] text-white"
                            : "bg-black text-white"
                            } rounded`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="prose max-w-none text-gray-800">
                <div className="overflow-x-auto">
                    {tabs.find((t) => t.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
}
