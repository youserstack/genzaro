import { fetcher } from "@/app/utils/fetcher";
import Breadcrumb from "@/components/Breadcrumb";
import ProductInfo from "@/components/ProductInfo";
import Gallery from "@/components/Gallery";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const product: Product = await fetcher(`products/${(await params).id}`);
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
