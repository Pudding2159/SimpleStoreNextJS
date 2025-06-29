"use client";

import { useState, useEffect } from "react";

export default function SizeQuantityCounter({
  sizes = ["XS", "S", "M", "L", "XL"],
  initialSize = "M",
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onChange = () => {},
}) {
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    onChange({ size, quantity });
  }, [size, quantity, onChange]);

  const decrement = () => {
    setQuantity((q) => Math.max(minQuantity, q - 1));
  };
  const increment = () => {
    setQuantity((q) => Math.min(maxQuantity, q + 1));
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center space-x-1 whitespace-nowrap">
        <span className="font-medium text-gray-700">Size</span>
        <span className="text-red-500">*</span>
      </label>

      <div className="border border-gray-300 rounded overflow-hidden">
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="appearance-none bg-white px-3 py-1 pr-6"
        >
          {sizes.map((sz) => (
            <option key={sz} value={sz}>
              {sz}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center border border-gray-300 rounded">
        <button
          onClick={decrement}
          disabled={quantity <= minQuantity}
          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
        >
          −
        </button>
        <div className="px-4 py-1 font-medium">{quantity}</div>
        <button
          onClick={increment}
          disabled={quantity >= maxQuantity}
          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
}
