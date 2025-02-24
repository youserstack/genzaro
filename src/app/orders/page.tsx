"use client";

import Row from "@/components/Row";
import { convertUSDToKRW } from "@/utils/currencyConverter";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getOrders() {
      const res = await fetch("/api/orders");
      if (!res.ok) return console.error("getOrders error");
      const orders = await res.json();
      console.log({ orders });
      setOrders(orders);
    }
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
                (a, v) => a + convertUSDToKRW(Number(v.amount.value)),
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
