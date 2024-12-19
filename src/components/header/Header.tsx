"use client";

import Logo from "./Logo";
import Nav from "./Nav";
import Burger from "./Burger";
import SideMenu from "./SideMenu";
import { CiShoppingCart } from "react-icons/ci";
import { IoBag, IoBagAdd } from "react-icons/io5";
import { GiBeachBag } from "react-icons/gi";
import { BsHandbag } from "react-icons/bs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart/CartContext";

export default function Header() {
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
    <header className="fixed top-0 left-0 right-0 z-[100] text-white">
      <section
        className="w-full relative flex flex-col flex-wrap z-[100] 
        whitespace-nowrap bg-gradient-to-r from-amber-500 to-emerald-500"
      >
        <div
          className="w-full  max-w-5xl mx-auto  
          grid grid-cols-[10%_auto_10%] items-center gap-3
          px-4 py-2 sm:px-6 lg:px-8 "
        >
          <Logo />
          <Nav />
          <Burger />
          <SideMenu />
          <div className="Features 기능 hidden md:flex items-center gap-4">
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
          </div>
        </div>
      </section>
    </header>
  );
}
