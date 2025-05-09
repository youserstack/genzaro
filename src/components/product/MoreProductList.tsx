"use client";

import { useState } from "react";
import ProductList from "./ProductList";

export default function MoreProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);

  const loadMoreProductList = async () => {
    try {
      const res = await fetch(`/api/products?sort=latest&limit=10&page=${page + 1}`);
      const newProducts = await res.json();
      if (!res.ok) throw new Error("더보기요청에러");
      setProducts((products) => [...products, ...newProducts]);
      setPage((page) => page + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ProductList products={products} />

      <div className="flex justify-center">
        <button
          className="
          px-10 py-4 text-2xl font-bold rounded-full
          text-white bg-amber-500 hover:bg-amber-600
          "
          onClick={loadMoreProductList}
        >
          더 보기
        </button>
      </div>
    </div>
  );
}
