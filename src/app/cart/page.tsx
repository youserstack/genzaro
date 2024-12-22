"use client";

import GroupedProductsBySeller from "@/components/cart/GroupedProductsBySeller";
import { CartContext } from "@/components/context/cart/CartContext";
import { fetcher } from "@/utils/fetcher";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const { items } = cart;
  const [groupes, setGroupes] = useState<Record<string, GroupedProduct[]>>({});

  useEffect(() => {
    if (!items.length) {
      setGroupes({});
      return;
    }

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
          groupedProductMap
            .get(product.seller)
            ?.push({ seller: product.seller, product, items: cartItems });
        });
        // console.log({ groupedProductMap });
        const groupes = Object.fromEntries(groupedProductMap);

        setGroupes(groupes);
      } catch (error) {
        console.error("카트페이지 제품데이터 패칭에러", error);
      }
    };

    getProducts();
  }, [items]);

  // useEffect(() => {
  //   const hasData = Object.keys(groupes).length > 0;
  //   if (hasData) console.log({ groupes });
  // }, [groupes]);

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
          {Object.entries(groupes).map(([seller, products]) => (
            <GroupedProductsBySeller key={seller} seller={seller} products={products} />
          ))}
        </ul>
      </section>
    </main>
  );
}
