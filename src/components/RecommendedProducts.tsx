"use client";

import Image from "next/image";
import Link from "next/link";

interface IProps {
  products: Product[];
}

export default function RecommendedProducts({ products }: IProps) {
  return (
    <section className="p-4">
      <h1 className="text-5xl font-semibold text-center mb-[200px]">Recommendations</h1>
      <div className="columns-2xs gap-4 space-y-4">
        {products.map((product) => (
          <Link key={product.productId} href={""} className="group inline-block">
            <Image
              alt={""}
              src={
                product.image ||
                "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"
              }
              className="w-full /aspect-[7/8]
                rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
              width={700}
              height={700}
            />
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
