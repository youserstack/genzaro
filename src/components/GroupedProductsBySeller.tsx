import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./context/cart/CartContext";

type Props = {
  seller: string;
  products: GroupedProduct[];
};

function OrderEditModal({
  open,
  setOpen,
  items,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: Item[];
}) {
  const { updateItem } = useContext(CartContext);
  const [updatedItems, setUpdatedItems] = useState(items);

  const handleChange = (index: number, key: keyof Item, value: string | number) => {
    setUpdatedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], [key]: value };
      return newItems;
    });
  };

  const handleSubmit = () => {
    // console.log({ updatedItems, items });
    updatedItems.forEach((updatedItem, index) => {
      const currentItem = items[index];
      updateItem(updatedItem.productId, currentItem, updatedItem);
    });

    setOpen(false);
  };

  return (
    <div className="OrderEditModal 주문수정모달">
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
          max-w-[500px]  bg-white
          p-4 border border-neutral-200 rounded-lg
          shadow-lg
          divide-y

          transition-all duration-300 transform
          ${
            open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[100px]"
          }
          `}
        >
          <h1 className="py-2 text-center">주문수정</h1>

          <ul className="py-4">
            {updatedItems.map((item, index) => (
              <li key={index} className="grid grid-cols-5 gap-2 py-1 items-center">
                <input
                  type="text"
                  value={item.color}
                  onChange={(e) => handleChange(index, "color", e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="색상"
                />

                <input
                  type="text"
                  value={item.size}
                  onChange={(e) => handleChange(index, "size", e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="사이즈"
                />

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, "quantity", parseInt(e.target.value, 10))}
                  className="border rounded px-2 py-1"
                />

                <span>{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              className="px-4 py-2 border rounded
              text-gray-500  border-gray-300 "
              onClick={() => setOpen(false)}
            >
              취소
            </button>
            <button
              className="px-4 py-2 rounded
              text-white bg-blue-500 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ groupedProduct }: { groupedProduct: GroupedProduct }) {
  const { product, items } = groupedProduct;
  const { removeItem, removeGroupedProduct } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleRemoveItem = (item: Item) => {
    // 아래의 필수속성(excludedKeys) 이외의 속성(color, size, ...)은 attributes로 객체를 만들어서 삭제메서드에 넘겨주어야한다.
    const excludedKeys = ["seller", "productId", "quantity", "price"];

    const attributes = Object.entries(item).reduce<Record<string, string | number | undefined>>(
      (acc, [key, value]) => {
        if (!excludedKeys.includes(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    // console.log({ attributes });

    removeItem(product._id, item);
  };

  const handleRemoveProduct = (product: Product) => {
    // removeItem(product._id, {});
    removeGroupedProduct(product._id);
  };

  return (
    <li
      className="Row border border-red-500
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
          <li className="grid grid-cols-5 font-semibold">
            <span>색상</span>
            <span>사이즈</span>
            <span>수량</span>
            <span>가격</span>
            <span></span>
          </li>

          {items.map((item, index) => (
            <li key={index} className="grid grid-cols-5">
              <span>{item.color}</span>
              <span>{item.size}</span>
              <span className="text-gray-500">{item.quantity}</span>
              <span>{item.total}</span>
              <button
                type="button"
                className="font-medium text-red-500 hover:text-red-600"
                onClick={() => handleRemoveItem(item)}
                title="삭제"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <div className="space-x-4 bg-green-50">
          <button type="button" className="font-medium " onClick={() => openModal()}>
            주문수정
          </button>

          <button
            type="button"
            className="font-medium text-red-500 "
            onClick={() => handleRemoveProduct(product)}
          >
            삭제
          </button>
        </div>

        <OrderEditModal open={open} setOpen={setOpen} items={items} />
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
