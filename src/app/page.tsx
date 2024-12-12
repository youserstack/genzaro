import ProductList from "@/components/ProductList";
import Carousel from "@/components/Carousel";
import RecommendedProducts from "@/components/RecommendedProducts";

async function fetcher(url: string) {
  try {
    const res = await fetch(`${process.env.DEFAULT_API_URL}/${url}`);
    if (!res.ok) throw new Error("res is not ok");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default async function Home() {
  // const products = await fetcher("products");
  // console.log({ products });

  return (
    <main>
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px]">
        <Carousel />
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
