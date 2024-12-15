import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <div className="ProductList 제품리스트 bg-white /border border-black/10">
      <div
        className="mx-auto max-w-2xl px-4 py-16 
        sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <div
          className="
          grid grid-cols-2 gap-x-6 gap-y-10 
          sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8"
        >
          {products.map((product) => (
            <Link key={product.productId} href={`/products/${product._id}`} className="group">
              <Image
                alt={""}
                src={
                  product.image ||
                  "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"
                }
                className="w-full aspect-[7/8]
                rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                width={700}
                height={700}
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
