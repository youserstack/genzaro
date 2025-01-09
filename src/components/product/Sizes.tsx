import { SIZES } from "@/data/productData";

export default function Sizes() {
  return (
    <div className="Sizes 사이즈">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">사이즈</h3>
        <a href="#" className="text-sm font-medium text-lime-500 hover:text-lime-400">
          사이즈 안내
        </a>
      </div>

      <fieldset className="grid gap-4 mt-4 grid-cols-4 sm:grid-cols-8 lg:grid-cols-4">
        {SIZES.map((size) => (
          <div key={size.name} className="Size_Item flex relative">
            <input
              type="radio"
              name="size"
              id={size.name}
              value={size.name}
              disabled={!size.inStock}
              className="hidden peer"
            />
            <label
              htmlFor={size.name}
              className={`Size_Label
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
      </fieldset>
    </div>
  );
}
