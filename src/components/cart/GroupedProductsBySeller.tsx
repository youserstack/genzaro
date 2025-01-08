"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import OrderEditModal from "./OrderEditModal";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CheckoutContext } from "../context/checkout/CheckoutContext";
import { useRouter } from "next/navigation";

type Props = {
  seller: string;
  products: GroupedProduct[];
};

export function Row({ groupedProduct }: { groupedProduct: GroupedProduct }) {
  const { product, items } = groupedProduct;
  const { removeItem, removeGroupedProduct } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleRemoveItem = (item: Item) => {
    removeItem(product._id, item);
  };

  const handleRemoveProduct = (product: Product) => {
    removeGroupedProduct(product._id);
  };

  return (
    <li
      className="Row 
      flex flex-col sm:flex-row
      divide-x-0 divide-y sm:divide-x sm:divide-y-0"
    >
      <div className="ProductInfo 제품정보 flex-1 p-4">
        <Link href={`/products/${product._id}`} className="flex gap-4">
          <div
            className="ImageContainer 이미지컨테이너
              shrink-0 w-[100px] sm:w-[130px] 
              overflow-hidden rounded-xl border border-neutral-200"
          >
            <Image
              alt={""}
              src={product.image}
              width={300}
              height={300}
              className="aspect-[1/1] 
                size-full object-cover pointer-events-none"
            />
          </div>

          <div className="p-2">
            <p>{product.title}</p>
            <p>{formatPrice(product.price)}</p>
          </div>
        </Link>
      </div>

      <div
        className="ItmeList 아이템리스트 
        flex-[1.5] p-4 flex flex-col gap-4
        overflow-x-auto whitespace-nowrap 
        "
      >
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="font-semibold">
              <th className="px-2 py-1">색상</th>
              <th className="px-2 py-1">사이즈</th>
              <th className="px-2 py-1">수량</th>
              <th className="px-2 py-1">가격</th>
              <th className="px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-1">{item.color}</td>
                <td className="px-2 py-1">{item.size}</td>
                <td className="px-2 py-1">{item.quantity}</td>
                <td className="px-2 py-1">{formatPrice(item.total)}</td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    className="font-medium text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item)}
                    title="삭제"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 p-2">
          <button
            type="button"
            className="
            flex gap-2 items-center 
            font-medium px-2 py-1
            border border-neutral-200 rounded-md 
            hover:bg-neutral-100
            "
            onClick={() => openModal()}
          >
            <FaRegEdit />
            주문수정
          </button>
          <button
            type="button"
            className="
            font-medium px-2 py-1
            text-red-500
            flex gap-2 items-center 
            border border-neutral-200 rounded-md 
            hover:bg-red-500 hover:text-white
            "
            onClick={() => handleRemoveProduct(product)}
          >
            <MdDelete />
            삭제
          </button>
        </div>

        <OrderEditModal open={open} setOpen={setOpen} items={items} />
      </div>
    </li>
  );
}

export default function GroupedProductsBySeller({ seller, products }: Props) {
  const { setProducts } = useContext(CheckoutContext);
  const router = useRouter();

  const handleSubmit = () => {
    setProducts(products);
    router.push("/checkout");
  };

  return (
    <li
      className="GroupedProductsBySeller 아이템
      min-h-[150px] p-4
      shadow-md
      bg-white
      border border-neutral-200 rounded-xl
      divide-y divide-neutral-200
      "
    >
      <div className="Title 타이틀 p-2 font-semibold text-xl">
        <h1>{seller}</h1>
      </div>

      <ul className="Rows divide-y">
        {products.map((groupedProduct) => (
          <Row key={groupedProduct.product._id} groupedProduct={groupedProduct} />
        ))}
      </ul>

      <div className="flex gap-4 justify-end p-4">
        <button
          className="
          border border-blue-500 bg-blue-500 hover:bg-blue-600 text-white
          px-4 py-2 rounded-md
          "
          onClick={handleSubmit}
        >
          주문하기
        </button>
      </div>
    </li>
  );
}
