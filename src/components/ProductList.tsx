import Image from "next/image";
import Link from "next/link";

interface IProps {
  products: Product[];
}

export default function ProductList({ products }: IProps) {
  return (
    <div className="bg-white border border-black">
      <div
        className="mx-auto max-w-2xl px-4 py-16 
        sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 className="sr-only">Products</h2>

        <div
          className="grid grid-cols-1 gap-x-6 gap-y-10 
          sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {products.map((product) => (
            <Link key={product.productId} href={""} className="group">
              <Image
                alt={""}
                src={
                  "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"
                }
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 
                xl:aspect-[7/8]"
                width={300}
                height={300}
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
