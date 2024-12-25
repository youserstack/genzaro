"use client";

import Link from "next/link";
import { useContext } from "react";
import { BsHandbag } from "react-icons/bs";
import { CartContext } from "../context/cart/CartContext";

export default function CartIcon() {
  const { cart } = useContext(CartContext);

  // const [cartItemCount, setCartItemCount] = useState(0);

  // useEffect(() => {
  //   if (!cart.items.length) return;

  //   const uniqueItemCount = new Set();
  //   cart.items.map((item) => {
  //     uniqueItemCount.add(item.productId);
  //   });
  //   console.log({ uniqueItemCount });

  //   setCartItemCount(uniqueItemCount.size);
  // }, [cart.items]);

  return (
    <Link href={"/cart"} className="relative">
      <BsHandbag className="text-xl" />
      <span
        className="
      absolute top-[-7px] right-[-7px]  /top-[-30%] /right-[-30%]
      size-4 text-xs bg-red-500 rounded-full
      flex items-center justify-center
      "
      >
        {cart.items.length}
        {/* {cartItemCount} */}
      </span>
    </Link>
  );
}
