import ProductList from "@/components/product/ProductList";
import Carousel from "@/components/Carousel";
import RecommendedProducts from "@/components/RecommendedProducts";
import { fetcher } from "../utils/fetcher";

export default async function Home() {
  const products = await fetcher("products");
  // console.log({ products });

  return (
    <main>
      <section className="pt-[50px] md:pt-[40px]">
        <Carousel />
      </section>
      <section
        className="max-w-screen-xl min-h-screen mx-auto py-[100px] 
        flex flex-col justify-center items-center"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-semibold text-center mb-[100px] whitespace-pre"
        >
          최신상품
        </h1>

        <ProductList products={products} />
      </section>
      <section
        className="max-w-screen-xl min-h-screen mx-auto py-[100px] 
        flex flex-col justify-center items-center"
      >
        <RecommendedProducts products={products} />
      </section>
    </main>
  );
}
