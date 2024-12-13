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

  useEffect(() => console.log({ selectedColor }), [selectedColor]);
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
      className="mt-4 lg:mt-0 border-2 border-green-500 
      lg:row-start-1 
      lg:row-span-2 
      lg:col-start-3
      "
    >
      {/* <p className="text-3xl">{product.price}</p> */}

      {/* <div className="mt-6">
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
      </div> */}

      <form className="mt-10" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
          <fieldset className="mt-4">
            <div className="flex items-center space-x-3">
              {[
                { name: "black", class: "bg-black", selectedClass: "ring-gray-400" },
                { name: "white", class: "bg-white", selectedClass: "ring-gray-400" },
                { name: "amber", class: "bg-amber-500", selectedClass: "ring-gray-900" },
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
                    className="Outer_Round
                    w-8 h-8 p-[2px] rounded-full peer-checked:ring-2 ring-black/80"
                  >
                    <div
                      className={`Inner_Round 
                      ${color.class} w-full h-full rounded-full border border-black/20 cursor-pointer`}
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Sizes */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Size guide
            </a>
          </div>

          <fieldset className="mt-4">
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
              {[
                { name: "XXS", inStock: false },
                { name: "XS", inStock: true },
                { name: "S", inStock: true },
                { name: "M", inStock: true },
                { name: "L", inStock: true },
                { name: "XL", inStock: true },
                { name: "2XL", inStock: true },
                { name: "3XL", inStock: true },
              ].map((size) => (
                <input
                  type="radio"
                  key={size.name}
                  value={selectedSize}
                  onChange={() => setSelectedSize(size.name)}
                  disabled={!size.inStock}
                  className={`
                  ${
                    size.inStock
                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                      : "cursor-not-allowed bg-gray-50 text-gray-200"
                  }
                    group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6

                  `}
                >
                  {/* <span>{size.name}</span> */}
                  {/* {size.inStock ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 size-full stroke-2 text-gray-200"
                      >
                        <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                      </svg>
                    </span>
                  )} */}
                </input>
              ))}
            </div>
          </fieldset>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to bag
        </button>
      </form>
    </div>
  );
}
