import Image from "next/image";
import Link from "next/link";

type Item = {
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

type MergedProduct = {
  productId: string;
  product: Product;
  items: Item[];
};

type Props = {
  mergedProduct: MergedProduct;
};

export default function CartItem({ mergedProduct }: Props) {
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const editItems = mergedProduct.items;
    console.log({ editItems });
  };

  return (
    <li
      key={mergedProduct.productId}
      className="CartItem 아이템
      min-h-[150px]
      divide-y divide-neutral-200
      p-4
      border border-neutral-200 rounded-xl
      bg-white
      shadow-md
      "
    >
      <div className="Title 타이틀 p-2 font-semibold text-xl">
        <h1>{mergedProduct.product.seller}</h1>
      </div>

      <div
        className="flex flex-col sm:flex-row
        divide-x-0 divide-y sm:divide-x sm:divide-y-0
        "
      >
        <div className="ProductInfo 제품정보 flex-1 p-4">
          <Link href={`/products/${mergedProduct.productId}`} className="flex gap-4">
            <div
              className="Image_Container 이미지컨테이너
              shrink-0 w-[100px] sm:w-[130px] 
              overflow-hidden rounded-xl border border-neutral-200"
            >
              <Image
                alt={""}
                src={mergedProduct.product.image}
                width={300}
                height={300}
                className="aspect-[1/1] 
                size-full object-cover pointer-events-none"
              />
            </div>

            <div>
              <p>{mergedProduct.product.title}</p>
              <p>{mergedProduct.product.price} 원</p>
            </div>
          </Link>
        </div>

        <div className="Options 옵션 flex-[1.5] flex flex-col p-4">
          <ul>
            <li className="grid grid-cols-4 font-semibold">
              <span>색상</span>
              <span>사이즈</span>
              <span>수량</span>
              <span>가격</span>
            </li>

            {mergedProduct.items.map((item, index) => (
              <li key={index} className="grid grid-cols-4">
                <span>{item.color}</span>
                <span>{item.size}</span>
                <span className="text-gray-500">{item.quantity}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="space-x-4 bg-green-50">
            <button type="button" className="font-medium " onClick={handleEdit}>
              주문수정
            </button>
            <button type="button" className="font-medium text-red-500 ">
              삭제
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-between p-4">
        <button>주문하기</button>
      </div>
    </li>
  );
}
