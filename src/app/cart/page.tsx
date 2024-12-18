"use client";

import CartItem from "@/components/CartItem";
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

type MergedProduct = {
  productId: string;
  product: Product;
  items: Item[];
};

export default function Cart() {
  const { state } = useContext(CartContext);
  const { items } = state;
  const [mergedProducts, setMergedProducts] = useState<MergedProduct[]>([]);

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
    console.log({ groupedItems });

    // 제품아이디로 데이터패칭
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
        console.log({ mergedData });

        setMergedProducts(mergedData);
      } catch (error) {
        console.error("Error fetching product details:", error);
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
          {mergedProducts.map((mergedProduct) => (
            <CartItem key={mergedProduct.productId} mergedProduct={mergedProduct} />
          ))}
        </ul>
      </section>
    </main>
  );
}

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

//   useEffect(() => {
//     if (!mergedProducts.length) return;

//     // 판재자로 리그룹핑
//     const regroupedItems = new Map<string, RegroupedProduct[]>();
//     mergedProducts.forEach((mergedProduct) => {
//       const existingGroup = regroupedItems.get(mergedProduct.product.seller);
//       if (!existingGroup) {
//         regroupedItems.set(mergedProduct.product.seller, [
//           { ...mergedProduct, seller: mergedProduct.product.seller },
//         ]);
//       } else {
//         existingGroup.push({ ...mergedProduct, seller: mergedProduct.product.seller });
//       }
//     });
//     console.log({ regroupedItems });
//     console.log("중첩된배열?", Array.from(regroupedItems.values()));

//     // setRegroupedProducts(regroupedItems);
//   }, [mergedProducts]);

//   if (mergedProducts.length) console.log({ mergedProducts });

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

//   useEffect(() => {
//     if (!mergedProducts.length) return;

//     // 판재자로 리그룹핑
//     const regroupedItems = new Map<string, RegroupedProduct[]>();
//     mergedProducts.forEach((mergedProduct) => {
//       const existingGroup = regroupedItems.get(mergedProduct.product.seller);
//       if (!existingGroup) {
//         regroupedItems.set(mergedProduct.product.seller, [
//           { ...mergedProduct, seller: mergedProduct.product.seller },
//         ]);
//       } else {
//         existingGroup.push({ ...mergedProduct, seller: mergedProduct.product.seller });
//       }
//     });
//     console.log({ regroupedItems });
//     console.log("중첩된배열?", Array.from(regroupedItems.values()));

//     // setRegroupedProducts(regroupedItems);
//   }, [mergedProducts]);

//   if (mergedProducts.length) console.log({ mergedProducts });

// --------------------

// items.forEach((item) => {
//   const product = products.find((product: any) => product._id === item.productId);
//   if (!product) return;

//   const { seller } = product; // 제품의 판매자 정보
//   const existingGroup = groupedBySeller.get(seller);
//   if (existingGroup) {
//     existingGroup.items.push(item);
//   } else {
//     groupedBySeller.set(seller, { seller, items: [item] });
//   }
// });

// // groupedBySeller와 products 병합
// const mergedData = Array.from(groupedBySeller.values()).map((group) => ({
//   seller: group.seller,
//   products: group.items.map((item) => {
//     const product = products.find((product: any) => product._id === item.productId);
//     return {
//       productId: item.productId,
//       product,
//       items: group.items.filter((i) => i.productId === item.productId),
//     };
//   }),
// }));

// setMergedProducts(mergedData);

// 제품아이디로 데이터패칭
// const getProducts = async () => {
//   try {
//     const products = await fetcher(`products?${searchParams.toString()}`);

//     // `products`와 `groupedItems` 병합
//     const mergedData = Array.from(groupedItems.entries()).map(([productId, items]) => {
//       const product = products.find((product: any) => product._id === productId);

//       return {
//         productId,
//         product,
//         items,
//       };
//     });

//     setMergedProducts(mergedData);
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//   }
// };
