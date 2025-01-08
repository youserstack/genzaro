import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

export default function Row({ groupedProduct }: { groupedProduct: GroupedProduct }) {
  const { product, items } = groupedProduct;

  return (
    <li
      className="Row 
        flex flex-col sm:flex-row
        divide-x-0 divide-y sm:divide-x sm:divide-y-0"
    >
      <div className="ProductInfo 제품정보 flex-1 p-4">
        <Link href={`/products/${product._id}`} className="flex gap-4">
          <div
            className="ImageContainer 이미지컨테이너
                shrink-0 w-[100px] sm:w-[130px] 
                overflow-hidden rounded-xl border border-neutral-200"
          >
            <Image
              alt={""}
              src={product.image}
              width={300}
              height={300}
              className="aspect-[1/1] 
                  size-full object-cover pointer-events-none"
            />
          </div>

          <div className="p-2">
            <p>{product.title}</p>
            <p>{formatPrice(product.price)}</p>
          </div>
        </Link>
      </div>

      <div
        className="ItmeList 아이템리스트 
          flex-[1.5] p-4 flex flex-col gap-4
          overflow-x-auto whitespace-nowrap 
          "
      >
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="font-semibold">
              <th className="px-2 py-1">색상</th>
              <th className="px-2 py-1">사이즈</th>
              <th className="px-2 py-1">수량</th>
              <th className="px-2 py-1">가격</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-1">{item.color}</td>
                <td className="px-2 py-1">{item.size}</td>
                <td className="px-2 py-1">{item.quantity}</td>
                <td className="px-2 py-1">{formatPrice(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </li>
  );
}
