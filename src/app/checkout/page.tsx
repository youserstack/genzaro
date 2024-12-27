"use client";

import PaymentOptions from "@/app/checkout/PaymentOptions";
import { CheckoutContext } from "@/components/context/checkout/CheckoutContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function ShippingInfo() {
  return (
    <div
      className="ShippingInfo 배송정보
        bg-white p-4 rounded-lg border border-neutral-200
        divide-y shadow-md 
        "
    >
      <h1 className="p-2 text-xl font-bold">배송정보</h1>

      <div className="px-2 py-4 space-y-2 font-medium">
        <div className="ShippingRecipient flex gap-4 items-center">
          <p className="font-semibold">홍길동</p>
          <p className="text-sm">010-0000-000</p>
        </div>

        <div className="ShippingAddress">
          <p>서울시 종로구</p>
        </div>

        <div className="ShippingSetting text-end">
          <button>수정</button>
        </div>
      </div>
    </div>
  );
}

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
          <PaymentOptions />
        </div>

        <div className="col-span-1 /border border-black/10 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1>결제상세</h1>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1>결제상세</h1>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1>결제상세</h1>
          </div>
        </div>
      </section>
    </main>
  );
}
