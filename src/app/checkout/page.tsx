"use client";

import PaymentOptions from "@/app/checkout/PaymentOptions";
import { CheckoutContext } from "@/components/context/checkout/CheckoutContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import OrderProductInfo from "./OrderProductInfo";
import ShippingInfo from "./ShippingInfo";

export default function page() {
  const { checkout } = useContext(CheckoutContext);
  const router = useRouter();

  useEffect(() => {
    // if (!checkout.products.length) {
    //   router.push("/cart");
    // }

    console.log({ checkout });
  }, []);

  return (
    <main className="bg-neutral-100">
      <section
        className="
        #size max-w-screen-xl min-h-screen 
        #display flex flex-col md:grid md:grid-cols-3 md:row-gap gap-4
        mx-auto border border-black px-4 md:px-16 pt-[100px] 
        "
      >
        <div className="col-span-2 /border border-black/10 space-y-4">
          <ShippingInfo />
          <OrderProductInfo />
          <PaymentOptions />
        </div>

        <div className="col-span-1 /border border-black/10 ">
          <div className="sticky top-[100px] space-y-4">
            <div
              className="CheckoutDetails 결제상세
              p-4 rounded-lg shadow-md 
              border border-neutral-200 bg-white 
              divide-y 
              "
            >
              <h1 className="p-2 text-xl font-bold">결제상세</h1>

              <p>결제금액 : {}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h1>결제상세</h1>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h1>결제상세</h1>
            </div>
          </div>

          {/* <div className="sticky top-[100px] space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h1>결제상세</h1>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h1>결제상세</h1>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h1>결제상세</h1>
            </div>
          </div> */}
        </div>
      </section>

      <section className="h-screen"></section>
      <section className="h-screen"></section>
      <section className="h-screen"></section>
    </main>
  );
}
