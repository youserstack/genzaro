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

export default function Header() {
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
            <Link href={"/cart"}>
              <BsHandbag className="text-xl" />
            </Link>
            {/* <GiBeachBag className="text-xl " /> */}
          </div>
        </div>
      </section>
    </header>
  );
}
