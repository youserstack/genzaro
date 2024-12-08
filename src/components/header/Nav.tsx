import { useRef, useState } from "react";

const details = [
  {
    title: "fashion1",
    items: [{ name: "1111111" }, { name: "1111111" }],
  },
  {
    title: "fashion2",
    items: [{ name: "222222" }, { name: "222222" }, { name: "222222" }, { name: "222222" }],
  },
  {
    title: "fashion3",
    items: [
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
      { name: "333333" },
    ],
  },
];

export default function Nav() {
  const [index, setIndex] = useState<number | null>(null);
  const detail = index !== null ? details[index] : null;

  return (
    <div className="border border-black">
      <ul
        className="Menu_List
        hidden sm:flex gap-4 justify-center 
        [&_>_li]:border
        [&_>_li]:border-orange-500
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
        absolute top-full left-0 right-0 /z-[100] bg-black

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
          className="Transition_Layer
          overflow-hidden w-full max-w-screen-lg mx-auto"
        >
          <div
            className="Padding_Layer
            p-10 border border-white"
          >
            <ul>
              {detail?.items.map((item, index) => (
                <li key={index} className="">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
