"use client";

import { CartContext } from "@/components/context/cart/CartContext";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type Item = {
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

export default function Cart() {
  const { state } = useContext(CartContext);
  const { items } = state;
  const [mergedProducts, setMergedProducts] = useState<any[]>([]);

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

  console.log({ mergedProducts });

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
    <div
      className="Cart 장바구니 border border-black/10

      "
    >
      <ul className="divide-y divide-neutral-200">
        {mergedProducts.map((mergedProduct) => (
          <li key={mergedProduct.productId} className="flex gap-4 py-6">
            <div className="size-[150px] overflow-hidden rounded-xl border border-neutral-200">
              <Image
                alt={""}
                src={mergedProduct.product.image}
                width={300}
                height={300}
                className="size-full object-cover pointer-events-none"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link href={`/products/${mergedProduct.productId}`}>
                      {mergedProduct.product.title}
                    </Link>
                  </h3>
                  <p className="ml-4">{mergedProduct.items[0].price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{mergedProduct.items[0].color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {mergedProduct.items[0].quantity}</p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
