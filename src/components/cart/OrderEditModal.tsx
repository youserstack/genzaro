import { useContext, useState } from "react";
import { CartContext } from "../context/cart/CartContext";
import { formatPrice } from "@/utils/formatPrice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: Item[];
}

export default function OrderEditModal({ open, setOpen, items }: Props) {
  const { updateItem } = useContext(CartContext);
  const [updatedItems, setUpdatedItems] = useState(items);

  const handleChange = (index: number, key: keyof Item, value: string | number) => {
    setUpdatedItems((prevItems) => {
      // 상태복사
      const newItems = [...prevItems];

      // 해당 카트아이템 필드(size,color,quantity)에 오버라이딩으로 수정
      newItems[index] = { ...newItems[index], [key]: value };

      // total 값 갱신
      if (key === "quantity") {
        newItems[index].total = newItems[index].quantity * newItems[index].price;
      }

      return newItems;
    });
  };

  const handleSubmit = () => {
    updatedItems.forEach((updatedItem, index) => {
      const currentItem = items[index];
      const newItem = {
        ...updatedItem,
        total: updatedItem.quantity * updatedItem.price, // total 갱신
      };
      updateItem(updatedItem.productId, currentItem, newItem);
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
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-[100px]"
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

                <span>{formatPrice(item.total)}</span>
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
