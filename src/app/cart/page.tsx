"use client";

import GroupedProductsBySeller from "@/components/GroupedProductsBySeller";
import { CartContext } from "@/components/context/cart/CartContext";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type Item = {
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

type GroupedProduct = {
  product: Product; // 팝퓰레잇될 제품
  items: Item[]; // 병합될 아이템들
};

type RegroupedProduct = {
  seller: string;
  products: GroupedProduct[];
};

export default function Cart() {
  const { state } = useContext(CartContext);
  const { items } = state;
  const [regroupedProducts, setRegroupedProducts] = useState<RegroupedProduct[]>([]);

  useEffect(() => {
    if (!items.length) return;

    const getProducts = async () => {
      // 유니크한 제품아이디를 추출하고 쿼리파라미터를 셋팅
      const productIds = [...new Set(items.map((item) => item.productId))];
      const searchParams = new URLSearchParams();
      productIds.forEach((id) => {
        searchParams.append("ids", id);
      });

      try {
        // 제품데이터 패칭
        const products: Product[] = await fetcher(`products?${searchParams.toString()}`);
        // console.log({ products });

        // 그룹핑
        const groupedProductMap = new Map<string, GroupedProduct[]>();
        products.forEach((product) => {
          // 값에 병합할 카트아이템을 추출
          const cartItems = items.filter((item) => item.productId === product._id);

          if (!groupedProductMap.has(product.seller)) {
            groupedProductMap.set(product.seller, []);
          }

          // 병합과 추가
          groupedProductMap.get(product.seller)?.push({ product, items: cartItems });
        });
        // console.log({ groupedProductMap });

        // 리그룹핑
        const regroupedProducts = Array.from(groupedProductMap.entries()).map(
          ([seller, products]) => ({
            seller,
            products,
          })
        );
        console.log({ regroupedProducts });

        setRegroupedProducts(regroupedProducts);
      } catch (error) {
        console.error("카트페이지 제품데이터 패칭에러", error);
      }
    };

    getProducts();
  }, [items]);

  return (
    <main className="bg-neutral-50">
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px]">
        <ul
          className="List 리스트
          max-w-4xl mx-auto 
          space-y-4 
          px-4 sm:px-6 md:px-8
          "
        >
          {regroupedProducts.map((product) => (
            <GroupedProductsBySeller key={product.seller} regroupedProduct={product} />
          ))}
        </ul>
      </section>
    </main>
  );
}
