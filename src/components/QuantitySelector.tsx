import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increase = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setQuantity((prev) => prev + 1);
  };
  const decrease = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrease}
        className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        // readOnly
        className="w-12 text-center text-lg font-medium border border-gray-300 rounded"
      />
      <button
        onClick={increase}
        className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}
