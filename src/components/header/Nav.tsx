"use client";

import { details } from "@/data/navData";
import { useState } from "react";

export default function Nav() {
  const [index, setIndex] = useState<number | null>(null);
  const detail = index !== null ? details[index] : null;

  return (
    <div className="Nav">
      <ul
        className="Menu_List
        hidden md:flex gap-4 justify-center /relative 
        [&_>_li:hover]:text-amber-400
        "
      >
        <li onMouseEnter={() => setIndex(0)}>
          <a href="">{details[0].title}</a>
        </li>
        <li onMouseEnter={() => setIndex(1)}>
          <a href="">{details[1].title}</a>
        </li>
        <li onMouseEnter={() => setIndex(2)}>
          <a href="">{details[2].title}</a>
        </li>
      </ul>

      <div
        className={`Mega_menu
        absolute top-full left-0 right-0 
        x-default-color

        grid transition-[grid-template-rows]
        ${index !== null ? `grid-rows-[1fr]` : "grid-rows-[0fr]"}
        `}
        // 높이 애니메이션 방법1
        // grid transition-[grid-template-rows]
        // ${index !== null ? `grid-rows-[1fr]` : "grid-rows-[0fr]"}

        // 높이 애니메이션 방법2
        // [interpolate-size:allow-keywords]
        // transform transition-all overflow-hidden
        // ${index !== null ? `h-auto visible` : "h-0 invisible"}

        onMouseLeave={() => setIndex(null)}
      >
        <div
          className={`Background_Layer 
          absolute inset-0 h-screen bg-black z-[-1]
          transition-opacity duration-[0.7s] ease-in-out
          pointer-events-none
          ${index !== null ? "opacity-50" : "opacity-0 "} `}
        />

        <div
          className="Transition_Animation_Layer
          overflow-hidden w-full max-w-screen-lg mx-auto"
        >
          <div
            className="Content_Layer 
            p-8 pb-16 flex gap-8 overflow-x-auto"
          >
            {detail?.items.map((item, index) => (
              <div key={index}>
                <h5 className="font-semibold text-lg cursor-pointer hover:text-amber-500">
                  {item.name}
                </h5>
                <div className="h-[2px] bg-gradient-to-r from-amber-500 to-emerald-500 mb-4"></div>

                <ul>
                  {item.items?.map((item, index) => (
                    <li key={index} className="cursor-pointer hover:text-amber-500">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
