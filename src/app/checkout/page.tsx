"use client";

import PaymentOptions from "@/app/checkout/PaymentOptions";
import { CheckoutContext } from "@/components/context/checkout/CheckoutContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OrderProductInfo from "./OrderProductInfo";
import ShippingInfo from "./ShippingInfo";
import { formatPrice } from "@/utils/formatPrice";
import { PayPalButtons, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import { postOrder } from "@/utils/postOrder";
import { convertKRWToUSD } from "@/utils/currencyConverter";

export default function page() {
  const router = useRouter();
  const { checkout } = useContext(CheckoutContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const createOrder: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
    return actions.order
      .create({
        intent: "CAPTURE",
        purchase_units: [
          { amount: { currency_code: "USD", value: `${convertKRWToUSD(checkout.total)}` } },
        ],
        // purchase_units: [{ amount: { currency_code: "USD", value: "10" } }],
      })
      .then((orderId: string) => {
        // console.log({ orderId });
        return orderId;
      });
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = (data, actions) => {
    if (!actions.order) {
      console.error("주문 작업을 찾을 수 없습니다.");
      return Promise.reject(new Error("주문 작업을 찾을 수 없습니다."));
    }

    // capture를 실행하여 결제진행
    return actions.order.capture().then(async (details) => {
      console.log("결제가 성공적으로 완료되었습니다(페이팔)", details);
      const order = {
        products: checkout.products,
        shippingInfo: checkout.shippingInfo,
        paymentInfo: details,
      };
      console.log({ order });
      await postOrder(order);
      alert(`결제가 완료되었습니다.`);
    });
  };

  const onCancel: PayPalButtonsComponentProps["onCancel"] = () => {
    alert("결제가 취소되었습니다.");
  };

  const onError: PayPalButtonsComponentProps["onError"] = (error) => {
    console.error("PayPal 결제 중 오류 발생:", error);
    alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
  };

  useEffect(() => {
    if (!checkout.products.length) {
      router.push("/cart");
    }

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
            onClick={handleClick}
          >
            결제하기
          </button>
        </section>
      </div>

      <div className="CheckoutModal 결제모달">
        <div
          className={`BackgroundLayer
            fixed inset-0 z-[100]
            bg-black transition-opacity duration-500
            ${open ? "opacity-50" : "opacity-0"}
            ${open ? "pointer-events-auto" : "pointer-events-none"}
          `}
          onClick={() => setOpen(false)}
        />

        <div
          className={`ModalPositionLayer
            fixed inset-0 z-[200] 
            flex justify-center items-center
            pointer-events-none 
          `}
        >
          <div
            className={`ModalLayer
            size-[500px] bg-white p-4 rounded-lg shadow-2xl
            transition-all duration-500
               ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100px]"}
               ${open ? "pointer-events-auto" : "pointer-events-none"}
            `}
          >
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={onCancel}
              onError={onError}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
