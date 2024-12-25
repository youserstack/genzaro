"use client";

import { useRef, useState } from "react";

const details = [
  {
    title: "Electronics",
    items: [
      {
        name: "Computers",
        items: [
          { name: "컴퓨터" },
          { name: "태블릿" },
          { name: "저장장치" },
          { name: "모니터" },
          { name: "컴퓨터 부품" },
          { name: "액세서리" },
        ],
      },
      {
        name: "Smart Home",
        items: [
          { name: "조명" },
          { name: "로봇청소기" },
          { name: "보안 시스템" },
          { name: "보이스 어시스턴트" },
          { name: "플러그" },
          { name: "부엌" },
        ],
      },
      { name: "Headphones" },
      { name: "Audio" },
      { name: "Car Electronics" },
      { name: "Accessories" },
    ],
  },
  {
    title: "Fashion",
    items: [
      {
        name: "Clothing",
        items: [
          { name: "자켓" },
          { name: "코트" },
          { name: "패딩" },
          { name: "티셔츠" },
          { name: "스웨트셔츠" },
          { name: "바지" },
          { name: "청바지" },
          { name: "반바지" },
          { name: "이너웨어" },
          { name: "스포츠웨어" },
        ],
      },
      {
        name: "Shoes",
        items: [
          { name: "운동화" },
          { name: "스니커즈" },
          { name: "런닝화" },
          { name: "부츠" },
          { name: "옥스퍼드화" },
          { name: "로퍼" },
          { name: "슬립온" },
          { name: "샌들" },
          { name: "슬리퍼" },
          { name: "작업화 및 안전화" },
        ],
      },
      { name: "Accessories" },
    ],
  },
  {
    title: "Home & Kitchen",
    items: [
      {
        name: "Furniture",
        items: [
          //
          { name: "소파" },
          { name: "침대" },
          { name: "의자" },
        ],
      },
      {
        name: "Kitchen & Dining",
        items: [
          //
          { name: "주방용품" },
          { name: "조리기구" },
          { name: "식기" },
          { name: "제빵기구" },
        ],
      },
      { name: "Cleaning", items: [{ name: "무선청소기" }, { name: "공기청정기" }] },
      { name: "Storage", items: [{ name: "수납 및 정리" }] },
    ],
  },
];

export default function Nav() {
  const [index, setIndex] = useState<number | null>(null);
  const detail = index !== null ? details[index] : null;

  return (
    <div className="Nav">
      <ul
        className="Menu_List
        hidden sm:flex gap-4 justify-center relative 
        /[&_>_li]:border
        /[&_>_li]:border-orange-500
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
            p-8 flex gap-4"
          >
            {detail?.items.map((item, index) => (
              <div key={index}>
                <h5 className="border-b-[1px] mb-2">{item.name}</h5>

                <ul>
                  {item.items?.map((item, index) => (
                    <li key={index}>{item.name}</li>
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
