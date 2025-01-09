"use client";

import { useContext } from "react";
import Reviews from "./Reviews";
import { CartContext } from "../context/cart/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { REVIEWS } from "@/data/productData";
import Colors from "./Colors";
import Sizes from "./Sizes";
import QuantityAndTotal from "./QuantityAndTotal";

interface Props {
  product: Product;
}

export default function Options({ product }: Props) {
  const { addItem } = useContext(CartContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력정보 추출
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const submittedData = Object.fromEntries(formData.entries());
    console.log({ submittedData });
    return;

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
        <Colors />
        <Sizes />
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
