import Carousel from "@/components/Carousel";
import RecommendedProductList from "@/components/RecommendedProductList";
import MoreProductList from "@/components/product/MoreProductList";

// export const dynamic = "force-static";
export const revalidate = 60;

async function getProducts(url: string) {
  const res = await fetch(`${process.env.API_URL}/api/${url}`, {
    next: { tags: ["products"] },
  });
  if (!res.ok) return undefined;
  return res.json();
}

export default async function Home() {
  const [latestProducts, poppularProducts] = await Promise.all([
    getProducts("products?sort=latest"),
    getProducts("products?sort=popular"),
  ]);

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
