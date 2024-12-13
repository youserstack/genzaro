"use client";

import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";

const reviews = { href: "#", average: 4, totalCount: 117 };

interface Props {
  product: Product;
}

export default function Options({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  //   useEffect(() => console.log({ selectedColor }), [selectedColor]);
  useEffect(() => console.log({ selectedSize }), [selectedSize]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    // console.log({ form });

    const formData = new FormData(form);
    // console.log({ formData });

    const submittedData = Object.fromEntries(formData.entries());
    console.log({ submittedData });
  };

  return (
    <div
      className="mt-4 lg:mt-0 /border-2 border-green-500 
      lg:row-start-1 
      lg:row-span-2 
      lg:col-start-3
      "
    >
      <p className="text-3xl">{product.price}</p>

      <div className="mt-6">
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <IoIosStar
                key={rating}
                className={`${reviews.average > rating ? "text-gray-900" : "text-gray-200"}
                "size-5 shrink-0"
              `}
              />
            ))}
          </div>
          <a
            href={reviews.href}
            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {reviews.totalCount} reviews
          </a>
        </div>
      </div>

      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="Colors">
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
          <fieldset className="mt-4">
            <div className="flex items-center space-x-3">
              {[
                { name: "black", class: "bg-black" },
                { name: "white", class: "bg-white" },
                { name: "red", class: "bg-red-500" },
                { name: "orange", class: "bg-orange-500" },
                { name: "yellow", class: "bg-yellow-500" },
                { name: "green", class: "bg-green-500" },
                { name: "blue", class: "bg-blue-500" },
                { name: "purple", class: "bg-purple-500" },
                { name: "pink", class: "bg-pink-500" },
                { name: "gray", class: "bg-gray-500" },
              ].map((color) => (
                <div key={color.name} className="flex items-center">
                  <input
                    type="radio"
                    name="color"
                    id={color.name}
                    value={selectedColor}
                    onChange={() => setSelectedColor(color.name)}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={color.name}
                    className={`Outer_Round
                    peer-checked:ring-2 /ring-black/80
                    p-[2px] rounded-full 

                    ${color.name === "black" ? "ring-black" : ""}
                    ${color.name === "white" ? "ring-black/30 dark:ring-white" : ""}
                    
                    ${color.name === "red" ? "ring-red-500" : ""}
                    ${color.name === "orange" ? "ring-orange-500" : ""}
                    ${color.name === "amber" ? "ring-amber-500" : ""}
                    ${color.name === "yellow" ? "ring-yellow-500" : ""}
                    ${color.name === "green" ? "ring-green-500" : ""}
                    ${color.name === "blue" ? "ring-blue-500" : ""}
                    ${color.name === "purple" ? "ring-purple-500" : ""}
                    ${color.name === "pink" ? "ring-pink-500" : ""}
                    ${color.name === "gray" ? "ring-gray-500" : ""}
                    `}
                  >
                    <div
                      className={`Inner_Round 
                      w-8 h-8  rounded-full border-[1px] border-black/10  cursor-pointer
                      ${color.class} `}
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="Sizes mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Size</h3>
            <a href="#" className="text-sm font-medium text-lime-500 hover:text-lime-400">
              Size guide
            </a>
          </div>

          <fieldset className="grid gap-4 mt-4 grid-cols-4 sm:grid-cols-8 lg:grid-cols-4">
            {[
              { name: "XXS", inStock: false },
              { name: "XS", inStock: true },
              { name: "S", inStock: true },
              { name: "M", inStock: true },
              { name: "L", inStock: true },
              { name: "XL", inStock: false },
              { name: "2XL", inStock: true },
              { name: "3XL", inStock: true },
            ].map((size) => (
              <div key={size.name} className="Size_Item flex relative">
                <input
                  type="radio"
                  id={size.name}
                  name="size"
                  value={selectedSize}
                  onChange={() => setSelectedSize(size.name)}
                  disabled={!size.inStock}
                  className="hidden peer"
                />
                <label
                  htmlFor={size.name}
                  className={`Size_Label
                    /peer-checked:ring-2 ring-amber-500 
                    peer-checked:border-blue-500
                    border-2 border-neutral-200 dark:border-neutral-600 rounded-md 
                    w-full shadow-sm uppercase font-medium px-4 py-3
                    flex justify-center items-center
                    
                    ${
                      size.inStock
                        ? "cursor-pointer bg-white dark:bg-neutral-700 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                        : "cursor-not-allowed bg-neutral-100 dark:bg-neutral-800 opacity-50"
                    }
                    `}
                >
                  <div className="">{size.name}</div>

                  {/* Overlay */}
                  {size.inStock ? (
                    <div className="Size_InStock_Overlay absolute inset-0 rounded-md border-2 border-transparent pointer-events-none" />
                  ) : (
                    <div className="Size_OutStock_Overlay absolute inset-0 rounded-md border-2 dark:border-neutral-600 pointer-events-none">
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 size-full stroke-2 text-neutral-200 dark:text-neutral-600"
                      >
                        <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            ))}
            {/* <div className="">
            </div> */}
          </fieldset>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md 
          border border-transparent 
          bg-lime-500 hover:bg-lime-600
          dark:bg-lime-800 dark:hover:bg-lime-900
          px-8 py-3 text-base font-medium text-white 
          "
        >
          Add to bag
        </button>
      </form>
    </div>
  );
}
