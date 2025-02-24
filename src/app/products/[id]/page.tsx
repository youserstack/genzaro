import Breadcrumb from "@/components/product/Breadcrumb";
import ProductInfo from "@/components/product/ProductInfo";
import Gallery from "@/components/product/Gallery";

// export const dynamic = "force-static"; // 정적페이지설정
export const revalidate = 60;

// export async function generateStaticParams() {
//   const posts = await fetch(`${process.env.API_URL}/api/products`)
// }

async function getProduct(id: string) {
  const res = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    next: { tags: ["product-detail"] },
  });
  if (!res.ok) return undefined;
  return res.json();
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // const product: Product = await fetchAPI(`products/${(await params).id}`);
  const product = await getProduct((await params).id);
  console.log({ product });

  return (
    <main>
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px] ">
        <Breadcrumb />
        <Gallery product={product} />
        <ProductInfo product={product} />
      </section>
    </main>
  );
}
