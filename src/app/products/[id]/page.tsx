import { fetchAPI } from "@/utils/fetchAPI";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductInfo from "@/components/product/ProductInfo";
import Gallery from "@/components/product/Gallery";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const product: Product = await fetchAPI(`products/${(await params).id}`);
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
