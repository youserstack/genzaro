import ProductList from "@/components/ProductList";

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
      <section className="max-w-screen-xl min-h-screen mx-auto ">
        {/* <ProductList products={products} /> */}
        <p className="mt-[100px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed minima delectus omnis est
          asperiores maxime officiis, id sunt, natus aliquam suscipit, ipsum molestias repellat
          dolorum laborum dignissimos. Commodi, hic minima!
        </p>
      </section>
    </main>
  );
}
