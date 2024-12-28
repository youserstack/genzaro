"use client";

import PaymentOptions from "@/app/checkout/PaymentOptions";
import { CheckoutContext } from "@/components/context/checkout/CheckoutContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import OrderProductInfo from "./OrderProductInfo";
import ShippingInfo from "./ShippingInfo";
import { formatPrice } from "@/utils/formatPrice";

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
        className="max-w-screen-xl min-h-screen mx-auto
        flex flex-col md:grid md:grid-cols-3 md:row-gap gap-4
        px-4 md:px-16 py-[100px]"
      >
        <div className="col-span-2 space-y-4">
          <ShippingInfo />
          <OrderProductInfo />
          <PaymentOptions />
        </div>

        <div className="col-span-1">
          <div className="sticky top-[100px] space-y-4">
            <div
              className="CheckoutDetails 결제상세
              p-4 rounded-lg shadow-md 
              border border-neutral-200 bg-white 
              divide-y 
              "
            >
              <h1 className="p-2 text-xl font-bold">결제상세</h1>

              <div className="px-2 pt-4 flex justify-between">
                <p>신용카드</p>
                <p>결제금액 : {formatPrice(checkout.total)}</p>
              </div>
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

      <div
        className="fixed bottom-0 left-0 right-0 sm:h-[15%] z-[100]
        shadow-[0_-35px_60px_-15px_rgba(0,0,0,0.3)]
        bg-white /shadow-2xl border-t border-neutral-200"
      >
        <section
          className="max-w-screen-xl h-full mx-auto 
          flex flex-col sm:flex-row justify-between items-center gap-4 
          px-8 py-8 sm:py-4"
        >
          <p>약관 및 주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
          <button
            className="shrink-0 w-full sm:w-auto min-w-[250px]
            p-4 bg-lime-500 rounded-xl text-xl font-bold"
          >
            결제하기
          </button>
        </section>
      </div>
    </main>
  );
}
