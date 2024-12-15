import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function Cart({ products }: Props) {
  return (
    <div
      className="Cart 장바구니 border border-black/10

      "
    >
      <ul className="divide-y divide-neutral-200">
        {products.map((product) => (
          <li key={product.productId} className="flex gap-4 py-6">
            <div className="size-[150px] overflow-hidden rounded-xl border border-neutral-200">
              <Image
                alt={""}
                src={product.image}
                width={300}
                height={300}
                className="size-full object-cover pointer-events-none"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link href={`/products/${product._id}`}>{product.title}</Link>
                  </h3>
                  <p className="ml-4">{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {product.quantity}</p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
