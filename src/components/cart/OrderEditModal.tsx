import { useContext, useState } from "react";
import { CartContext } from "../context/cart/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { COLORS, SIZES } from "@/data/productData";

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

      // 현제아이템에서 필드(size,color,quantity)를 수정
      newItems[index] = { ...newItems[index], [key]: value };

      // total 값 갱신
      if (key === "quantity") {
        newItems[index].total = newItems[index].quantity * newItems[index].price;
      }

      return newItems;
    });
  };

  const handleQuantityChange = (index: number, increase: boolean) => {
    setUpdatedItems((prevItems) => {
      const newItems = [...prevItems];
      const currentItem = newItems[index];

      // 새로운 수량 계산
      const newQuantity = increase
        ? currentItem.quantity + 1
        : Math.max(1, currentItem.quantity - 1);

      // 현재 아이템을 업데이트
      newItems[index] = {
        ...currentItem,
        quantity: newQuantity,
        total: newQuantity * currentItem.price,
      };

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
            divide-y divide-neutral-200
            m-4
  
            transition-all duration-300 transform
            ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-[100px]"
            }
            overflow-x-auto
            `}
        >
          <h1 className="p-4 text-center text-xl font-bold tracking-[10px]">주문수정</h1>

          <div className="py-4 overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="font-semibold">
                  <th className="px-2 py-1">색상</th>
                  <th className="px-2 py-1">사이즈</th>
                  <th className="px-2 py-1">수량</th>
                  <th className="px-2 py-1">총합</th>
                </tr>
              </thead>
              <tbody>
                {updatedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="Color 색상 px-2 py-1 w-[25%] min-w-[100px]">
                      <select
                        value={item.color}
                        onChange={(e) => handleChange(index, "color", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        {COLORS.map((color) => (
                          <option key={color.name} value={color.name}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="Size 사이즈 px-2 py-1 w-[20%] min-w-[70px]">
                      <select
                        value={item.size}
                        onChange={(e) => handleChange(index, "size", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        {SIZES.map((size) => (
                          <option key={size.name} value={size.name}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="Quantity 수량 px-2 py-1 w-[20%] min-w-[70px]">
                      <div className="border border-neutral-200 flex rounded-sm overflow-hidden">
                        <button
                          className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300"
                          type="button"
                          onClick={() => handleQuantityChange(index, false)} // 수량 감소
                        >
                          -
                        </button>

                        <input
                          className="min-w-[50px] w-[50px] text-center"
                          type="number"
                          name={`quantity-${index}`}
                          id={`quantity-${index}`}
                          value={item.quantity}
                          min={1}
                          onChange={
                            (e) =>
                              handleChange(index, "quantity", Math.max(1, Number(e.target.value))) // 최소값 1 보장
                          }
                        />

                        <button
                          className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300"
                          type="button"
                          onClick={() => handleQuantityChange(index, true)} // 수량 증가
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="px-2 py-1">{formatPrice(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end space-x-4 ">
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
