"use client";

import { convertUSDToKRW } from "@/utils/currencyConverter";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Row({ groupedProduct }: { groupedProduct: GroupedProduct }) {
  const { product, items } = groupedProduct;

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
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-1">{item.color}</td>
                <td className="px-2 py-1">{item.size}</td>
                <td className="px-2 py-1">{item.quantity}</td>
                <td className="px-2 py-1">{formatPrice(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </li>
  );
}

export default function page() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch("/api/orders");
      const orders = await res.json();
      console.log({ orders });
      setOrders(orders);
    };
    getOrders();
  }, []);

  return (
    <main>
      <section
        className="max-w-screen-xl min-h-screen mx-auto
        flex flex-col md:grid md:grid-cols-4 md:row-gap gap-4
        px-4 md:px-16 py-[100px]
        "
      >
        <div className="col-span-1">
          <div className="sticky top-[100px] space-y-4">
            <ul
              className="
              p-4 rounded-lg shadow-md 
              border border-neutral-200 bg-white 
              divide-y 
              "
            >
              <li className="p-2 text-xl font-bold">주문내역</li>
              <li className="p-2 text-xl font-bold">관심상품</li>
            </ul>
          </div>
        </div>

        <div className="col-span-3">
          <ul className="OrderList space-y-4">
            {orders.map((order) => {
              const total = order.paymentInfo.purchase_units.reduce(
                (a: any, v: any) => a + convertUSDToKRW(Number(v.amount.value)),
                0
              );
              return (
                <li
                  key={order._id}
                  className="OrderItem
                min-h-[150px] p-4 shadow-md 
                border border-neutral-200 rounded-xl
                divide-y divide-neutral-200
                bg-white
                "
                >
                  <div className="Title 타이틀 p-2 font-semibold text-xl flex justify-between">
                    <h1>{order.products[0].seller}</h1>
                    <p>{formatPrice(total)}</p>
                  </div>

                  <ul className="Rows divide-y">
                    {order.products.map((groupedProduct) => (
                      <Row key={groupedProduct.product._id} groupedProduct={groupedProduct} />
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
