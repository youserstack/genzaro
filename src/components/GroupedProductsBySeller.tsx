import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./context/cart/CartContext";

type GroupedProduct = {
  product: Product; // 팝퓰레잇될 제품
  items: Item[]; // 병합될 아이템들
};

type Props = {
  seller: string;
  products: GroupedProduct[];
};

function OrderEditModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log({ open });
  return (
    <div className="OrderEditModal 주문수정모달 border border-red-500">
      <div
        className={`Background_Layer 
        fixed inset-0 z-[100] bg-black
        transition-opacity duration-[0.7s] ease-in-out
        ${open ? "opacity-50" : "opacity-0 pointer-events-none"} 
        `}
        onClick={() => setOpen(false)}
      />

      <div
        className={`Modal_Position_Layer
        fixed inset-0 z-[200]
        pointer-events-none 
        flex justify-center items-center 
        `}
      >
        <div
          className={`Modal_Layer
          w-[300px] h-[300px] bg-white
          pointer-events-auto
          transition-all duration-300 transform 
          ${open ? "opacity-100 translate-y-0:" : "opacity-0 translate-y-[100px]"}  
          `}
        >
          <h1>some</h1>
        </div>
      </div>
    </div>
  );
}

function Row({ groupedProduct }: { groupedProduct: GroupedProduct }) {
  const { product, items } = groupedProduct;
  const { removeItem } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const editItems = regroupedProduct.items;
    console.log({ editItems: items });
    setOpen(true);
  };

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    removeItem(product._id, { color: "red", size: "M" });
  };

  return (
    <li
      className="Row
      flex flex-col sm:flex-row
      divide-x-0 divide-y sm:divide-x sm:divide-y-0"
    >
      <div className="ProductInfo 제품정보 flex-1 p-4">
        <Link href={`/products/${product._id}`} className="flex gap-4">
          <div
            className="Image_Container 이미지컨테이너
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

          <div>
            <p>{product.title}</p>
            <p>{product.price} 원</p>
          </div>
        </Link>
      </div>

      <div className="ItmeList 아이템리스트 flex-[1.5] flex flex-col p-4">
        <ul>
          <li className="grid grid-cols-4 font-semibold">
            <span>색상</span>
            <span>사이즈</span>
            <span>수량</span>
            <span>가격</span>
          </li>

          {items.map((item, index) => (
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

          <button type="button" className="font-medium text-red-500 " onClick={handleRemoveItem}>
            삭제
          </button>
        </div>

        <OrderEditModal open={open} setOpen={setOpen} />
      </div>
    </li>
  );
}

export default function GroupedProductsBySeller({ seller, products }: Props) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log({ products });
  };

  return (
    <li
      className="GroupedProductsBySeller 아이템
      min-h-[150px]
      divide-y divide-neutral-200
      p-4
      border border-neutral-200 rounded-xl
      bg-white
      shadow-md
      "
    >
      <div className="Title 타이틀 p-2 font-semibold text-xl">
        <h1>{seller}</h1>
      </div>

      <ul className="Rows divide-y">
        {products.map((groupedProduct) => (
          <Row key={groupedProduct.product._id} groupedProduct={groupedProduct} />
        ))}
      </ul>

      <div className="flex gap-4 justify-between p-4">
        <button onClick={handleSubmit}>주문하기</button>
      </div>
    </li>
  );
}
