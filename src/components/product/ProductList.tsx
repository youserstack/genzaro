import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <div
      className="ProductList  
      px-4 sm:px-6 lg:px-8 py-16 sm:py-24 
      mx-auto bg-white
      "
    >
      <ul
        className="
        grid
        grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        gap-x-6 gap-y-10 xl:gap-x-8
        "
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
            <p className="mt-1 text-lg font-medium text-gray-900">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
