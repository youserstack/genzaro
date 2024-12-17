"use client";

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

type MergedItem = {
  productId: string;
  product: Product;
  items: Item[];
};

export default function Cart() {
  const { state } = useContext(CartContext);
  const { items } = state;
  const [mergedProducts, setMergedProducts] = useState<MergedItem[]>([]);

  useEffect(() => {
    if (!items.length) return;

    // 아이템 제품아이디로 그룹핑
    const groupedItems = new Map<string, Item[]>();
    items.forEach((item) => {
      const existingGroup = groupedItems.get(item.productId);
      if (existingGroup) {
        existingGroup.push(item);
      } else {
        groupedItems.set(item.productId, [item]);
      }
    });

    const getProducts = async () => {
      const productIds = Array.from(groupedItems.keys());
      const searchParams = new URLSearchParams();
      productIds.forEach((id) => {
        searchParams.append("ids", id);
      });

      try {
        const products = await fetcher(`products?${searchParams.toString()}`);

        // `products`와 `groupedItems` 병합
        const mergedData = Array.from(groupedItems.entries()).map(([productId, items]) => {
          const product = products.find((product: any) => product._id === productId);

          return {
            productId,
            product,
            items,
          };
        });

        setMergedProducts(mergedData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProducts();
  }, [items]);

  if (mergedProducts.length) console.log({ mergedProducts });

  //   useEffect(() => {
  //     const getData = async () => {
  //       // const products = await fetcher("/products");
  //       // console.log(products);
  //       // const carts = await fetcher('')

  //       const map = new Map();

  //       items.forEach(({ productId, quantity, price, color, size }) => {
  //         if (!map.has(productId)) {
  //           map.set(productId, { options: [] });
  //         }

  //         map.get(productId).options.push({ quantity, color, size });
  //       });

  //       //   console.log({ map });
  //     };
  //     getData();
  //   }, []);

  return (
    <main className="bg-neutral-50">
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px]">
        <ul
          className="List 리스트
          max-w-4xl mx-auto 
          space-y-8
          px-4 sm:px-6 md:px-8
          "
        >
          {mergedProducts.map((mergedProduct, index) => (
            <li
              key={mergedProduct.productId}
              className="Item 아이템
              flex flex-col sm:flex-row
              divide-y sm:divide-x
              px-4 py-0 sm:px-0 sm:py-4

              border border-neutral-200 rounded-xl
              bg-white
              shadow-md
              "
            >
              <div className="flex-1 px-0 sm:px-4 py-4 sm:py-0">
                <Link href={`/products/${mergedProduct.productId}`} className="flex gap-4">
                  <div
                    className="
                    shrink-0 w-[100px] md:w-[150px] 
                    overflow-hidden rounded-xl border border-neutral-200"
                  >
                    <Image
                      alt={""}
                      src={mergedProduct.product.image}
                      width={300}
                      height={300}
                      className="aspect-[1/1] 
                    size-full object-cover pointer-events-none"
                    />
                  </div>

                  <div>
                    <p>{mergedProduct.product.title}</p>
                    <p>{mergedProduct.product.price} 원</p>
                  </div>
                </Link>
              </div>

              <div className="flex-1 px-0 sm:px-4 py-4 sm:py-0">
                <ul className="border border-black">
                  <div className="grid grid-cols-5">
                    <p className="font-semibold">색상</p>
                    <p className="font-semibold">사이즈</p>
                    <p className="font-semibold">수량</p>
                    <p className="font-semibold">가격</p>
                    <p className="font-semibold">삭제</p>
                  </div>
                  {mergedProduct.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-5">
                      <p>{item.color}</p>
                      <p>{item.size}</p>
                      <p className="text-gray-500">{item.quantity}</p>
                      <p>{item.price}</p>

                      <button type="button" className="font-medium text-red-500">
                        <IoClose />
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
