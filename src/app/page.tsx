import ProductList from "@/components/ProductList";
import Carousel from "@/components/Carousel";
import RecommendedProducts from "@/components/RecommendedProducts";
import { fetcher } from "./utils/fetcher";

export default async function Home() {
  // const products = await fetcher("products");
  // console.log({ products });

  return (
    <main>
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px] flex justify-center items-center">
        <div>
          <div className="flex">
            <input type="radio" name="hs-default-radio" id="hs-default-radio" />
            <label htmlFor="hs-default-radio">Default radio</label>
          </div>

          <div className="flex">
            <input
              type="radio"
              name="hs-default-radio"
              className="shrink-0 mt-0.5 border-gray-200 rounded-full 
                      text-blue-600 focus:ring-blue-500 disabled:opacity-50 
                      disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 
                      dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-checked-radio"
            />
            <label
              htmlFor="hs-checked-radio"
              className="text-sm text-gray-500 ms-2 dark:text-neutral-400"
            >
              Checked radio
            </label>
          </div>
        </div>

        {/* <Carousel /> */}
        {/* <ProductList products={products} /> */}
        {/* <RecommendedProducts products={products} /> */}

        {/* <div className="max-w-screen-lg mx-auto /w-[70vw] border-2 border-orange-400">
        </div> */}
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed minima delectus omnis est
          asperiores maxime officiis, id sunt, natus aliquam suscipit, ipsum molestias repellat
          dolorum laborum dignissimos. Commodi, hic minima!
        </p> */}
      </section>
    </main>
  );
}
