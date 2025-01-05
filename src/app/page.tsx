import ProductList from "@/components/product/ProductList";
import Carousel from "@/components/Carousel";
import RecommendedProductList from "@/components/RecommendedProductList";
import { fetcher } from "../utils/fetcher";
import MoreProductList from "@/components/product/MoreProductList";

export default async function Home() {
  const latestProducts = await fetcher("products?sort=latest");
  const poppularProducts = await fetcher("products?sort=popular");
  // console.log({ products });

  return (
    <main>
      {/* <section className="pt-[50px] md:pt-[40px]">
        <Carousel />
      </section> */}

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

        {/* <ProductList products={latestProducts} /> */}
        <MoreProductList initialProducts={latestProducts} />
      </section>

      <section
        className="max-w-screen-xl min-h-screen mx-auto py-[100px] 
        flex flex-col justify-center items-center"
      >
        <RecommendedProductList products={poppularProducts} />
      </section>
    </main>
  );
}
