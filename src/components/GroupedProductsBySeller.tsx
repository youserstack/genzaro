import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./context/cart/CartContext";
import { formatPrice } from "@/utils/formatPrice";

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
    removeItem(product._id, item);
  };

  const handleRemoveProduct = (product: Product) => {
    removeGroupedProduct(product._id);
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
              <th className="px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-1">{item.color}</td>
                <td className="px-2 py-1">{item.size}</td>
                <td className="px-2 py-1">{item.quantity}</td>
                <td className="px-2 py-1">{formatPrice(item.total)}</td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    className="font-medium text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item)}
                    title="삭제"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 bg-green-50 p-2">
          <button type="button" className="font-medium" onClick={() => openModal()}>
            주문수정
          </button>
          <button
            type="button"
            className="font-medium text-red-500"
            onClick={() => handleRemoveProduct(product)}
          >
            삭제
          </button>
        </div>

        {/* 모달 컴포넌트 */}
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
