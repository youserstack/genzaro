import { CheckoutContext } from "@/components/context/checkout/CheckoutContext";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function OrderProductInfo() {
  const {
    checkout: { products },
  } = useContext(CheckoutContext);
  const items = products.reduce(
    (a, v) => [
      ...a,
      ...v.items.map((item) => ({
        ...item,
        // 끼워넣을필드값들
        image: v.product.image,
        title: v.product.title,
      })),
    ],
    [] as Item[]
  );
  // console.log({ items });

  return (
    <div className="OrderProductInfo bg-white p-4 rounded-lg shadow-md divide-y">
      <div className="Title 타이틀 p-2 font-semibold text-xl">
        <h1>주문상품</h1>
      </div>

      <div className="OrderList px-2 pt-4 space-y-2">
        {items.map((item, index) => (
          <div className="ProductInfo 제품정보 flex-1 p-4" key={index}>
            <Link href={`/products/${item.productId}`} className="flex gap-4">
              <div
                className="ImageContainer 이미지컨테이너
                shrink-0 w-[100px] sm:w-[130px] 
                overflow-hidden rounded-xl border border-neutral-200"
              >
                <Image
                  alt={""}
                  src={item.image as string}
                  width={300}
                  height={300}
                  className="aspect-[1/1] 
                  size-full object-cover pointer-events-none"
                />
              </div>

              <div className="p-2">
                <p>{item.title}</p>
                <p>{formatPrice(item.price)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
