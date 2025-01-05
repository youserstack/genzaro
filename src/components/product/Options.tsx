"use client";

import { useContext, useState } from "react";
import Reviews from "./Reviews";
import { CartContext } from "../context/cart/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { COLORS, REVIEWS, SIZES } from "@/data/productData";

function Colors({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="Colors 칼라">
      <h3 className="text-sm font-medium text-gray-900">색상</h3>
      <fieldset className="mt-4">
        <div className="flex items-center gap-3 flex-wrap">
          {COLORS.map((color) => (
            <div key={color.name} className="flex items-center">
              <input
                type="radio"
                name="color"
                id={color.name}
                value={selectedColor}
                onChange={() => setSelectedColor(color.name)}
                className="peer hidden"
              />
              <label
                htmlFor={color.name}
                className={`Outer_Round
                p-[2px] rounded-full peer-checked:ring-2 ${color.ring} `}
              >
                <div
                  className={`Inner_Round
                  w-8 h-8 rounded-full border-[1px] border-black/10 
                  cursor-pointer ${color.bg} `}
                />
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function Sizes({
  selectedSize,
  setSelectedSize,
}: {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="Sizes 사이즈">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">사이즈</h3>
        <a href="#" className="text-sm font-medium text-lime-500 hover:text-lime-400">
          사이즈 안내
        </a>
      </div>

      <fieldset className="grid gap-4 mt-4 grid-cols-4 sm:grid-cols-8 lg:grid-cols-4">
        {SIZES.map((size) => (
          <div key={size.name} className="Size_Item flex relative">
            <input
              type="radio"
              id={size.name}
              name="size"
              value={selectedSize}
              onChange={() => setSelectedSize(size.name)}
              disabled={!size.inStock}
              className="hidden peer"
            />
            <label
              htmlFor={size.name}
              className={`Size_Label
                    peer-checked:border-blue-500
                    border-2 border-neutral-200 dark:border-neutral-600 rounded-md 
                    w-full shadow-sm uppercase font-medium px-4 py-3
                    flex justify-center items-center
                    
                    ${
                      size.inStock
                        ? "cursor-pointer bg-white dark:bg-neutral-700 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                        : "cursor-not-allowed bg-neutral-100 dark:bg-neutral-800 opacity-50"
                    }
                    `}
            >
              <div className="">{size.name}</div>

              {size.inStock ? (
                <div className="Size_InStock_Overlay absolute inset-0 rounded-md border-2 border-transparent pointer-events-none" />
              ) : (
                <div className="Size_OutStock_Overlay absolute inset-0 rounded-md border-2 dark:border-neutral-600 pointer-events-none">
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 size-full stroke-2 text-neutral-200 dark:text-neutral-600"
                  >
                    <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              )}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

function QuantityAndTotal({ price }: { price: number }) {
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

type Props = {
  product: Product;
};

export default function Options({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useContext(CartContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력정보 추출
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const submittedData = Object.fromEntries(formData.entries());
    if (!submittedData.color || !submittedData.size || !submittedData.quantity) {
      alert("옵션을 선택해주세요.");
      return;
    }

    // 제품정보 추출
    const { seller, _id, price } = product;

    // 수량과 총액 계산
    const quantity = Number(submittedData.quantity || 1);
    const total = Number(product.price) * quantity; // 총액 계산

    // 필요한 모든정보를 병합하여 카트아이템객체 생성
    const newItem = {
      // 사용자로부터 입력받은 값들 (추가필드가 존재할 수 있어서 추가)
      ...submittedData,
      // 필수 필드값들
      seller,
      productId: _id,
      price: Number(price),
      // 계산된 필드값들
      quantity,
      total,
    };

    addItem(newItem);
  };

  return (
    <div
      className="Options 옵션
      mt-4 lg:mt-0 /border-2 border-green-500 
      lg:row-start-1 lg:row-span-2 
      lg:col-start-3
      "
    >
      <p className="text-3xl">{formatPrice(product.price)}</p>

      <div className="mt-6">
        <Reviews reviews={REVIEWS} />
      </div>

      <form className="mt-10 flex flex-col gap-10" onSubmit={handleSubmit}>
        <Colors selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        <Sizes selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        <QuantityAndTotal price={Number(product.price)} />

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md 
          border border-transparent 
          bg-lime-500 hover:bg-lime-600
          dark:bg-lime-800 dark:hover:bg-lime-900
          px-8 py-3 text-base font-medium text-white 
          "
        >
          장바구니에 담기
        </button>
      </form>
    </div>
  );
}
