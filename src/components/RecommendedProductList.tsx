"use client";

import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function RecommendedProductList({ products }: Props) {
  return (
    <div
      className="RecommendedProductList
      px-4 sm:px-6 lg:px-8 py-16 sm:py-24 
      mx-auto 
      "
    >
      <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-semibold text-center mb-[100px] whitespace-pre"
      >
        추천제품
      </h1>

      <ul
        className="
        columns-2 sm:columns-3 md:columns-4 lg:columns-5
        "
      >
        {products.map((product) => (
          <Link key={product.productId} href={""} className="group inline-block py-4">
            <Image
              alt={""}
              src={
                product.image ||
                "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"
              }
              className="w-full /aspect-[7/8]
              rounded-lg bg-gray-200 object-cover 
              transition-opacity 
              group-hover:opacity-75
              "
              width={700}
              height={700}
            />
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
