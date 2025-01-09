import { useState } from "react";

export default function QuantityAndTotal({ price }: { price: number }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="QuantityAndTotal 수량">
      <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
        수량
      </label>
      <div className="mt-4 flex justify-between items-center">
        <div className="border border-neutral-200 flex rounded-lg overflow-hidden">
          <button
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300"
            type="button"
            onClick={decrease}
          >
            -
          </button>

          <input
            className="min-w-[50px] w-[50px] text-center "
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />

          <button
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300"
            type="button"
            onClick={increase}
          >
            +
          </button>
        </div>

        <div>
          총액: <span className="font-bold">{(price * quantity).toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
