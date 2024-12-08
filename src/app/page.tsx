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
      <section className="max-w-screen-xl mx-auto">
        {/* <ProductList products={products} /> */}
      </section>
    </main>
  );
}
