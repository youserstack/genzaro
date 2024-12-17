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
  const [productDetails, setProductDetails] = useState<any[]>([]);

  useEffect(() => {
    const groupedItems = new Map<string, Item[]>();

    items.forEach((item) => {
      const existingGroup = groupedItems.get(item.productId);
      if (existingGroup) {
        existingGroup.push(item);
      } else {
        groupedItems.set(item.productId, [item]);
      }
    });

    const productIds = Array.from(groupedItems.keys());
    const searchParams = new URLSearchParams();
    productIds.forEach((id) => {
      searchParams.set("ids", id);
    });
    console.log({ searchParams });
    const some = searchParams.getAll("ids");
    console.log({ some });
    const getProducts = async () => {
      try {
        // const some = useSearchParams()
        const searchParams = new URLSearchParams();
        productIds.forEach((id) => {
          searchParams.set("ids", id);
        });
        const response = await fetch(`/api/products?ids=${productIds.join(",")}`);
        const data = await response.json();

        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  }, [items]);

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
        {/* {items.map((item) => (
          <li key={item.productId} className="flex gap-4 py-6">
            <div className="size-[150px] overflow-hidden rounded-xl border border-neutral-200">
              <Image
                alt={""}
                src={item.image}
                width={300}
                height={300}
                className="size-full object-cover pointer-events-none"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link href={`/products/${item._id}`}>{item.title}</Link>
                  </h3>
                  <p className="ml-4">{item.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {item.quantity}</p>

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
        ))} */}
      </ul>
    </div>
  );
}
