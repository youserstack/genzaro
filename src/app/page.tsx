import ProductList from "@/components/product/ProductList";
import Carousel from "@/components/Carousel";
import RecommendedProducts from "@/components/RecommendedProducts";
import { fetcher } from "../utils/fetcher";
import Example from "@/components/Example";

export default async function Home() {
  const products = await fetcher("products");
  // console.log({ products });

  return (
    <main>
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px] flex justify-center items-center">
        <ProductList products={products} />

        {/* <Example /> */}
        {/* <Carousel /> */}
        {/* <RecommendedProducts products={products} /> */}

        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed minima delectus omnis est
          asperiores maxime officiis, id sunt, natus aliquam suscipit, ipsum molestias repellat
          dolorum laborum dignissimos. Commodi, hic minima!
        </p> */}
      </section>
    </main>
  );
}
