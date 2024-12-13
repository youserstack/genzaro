import { fetcher } from "@/app/utils/fetcher";
import Options from "@/components/Options";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const product: Product = await fetcher(`products/${(await params).id}`);
  console.log({ product });

  return (
    <main>
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px] bg-neutral-200">
        <div
          className="제품정보
          max-w-2xl lg:max-w-7xl mx-auto
          px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16
          lg:gap-x-8 
          border-2 border-red-500

          lg:grid 
          lg:grid-rows-[auto_auto_1fr] 
          lg:grid-cols-3 
          "
        >
          <div
            className="제목
            border-2 border-purple-500 
            lg:pr-8

            lg:row-start-1
            lg:col-start-1
            lg:col-span-2
            "
          >
            <h1 className="text-2xl sm:text-3xl font-semibold ">{product.title}</h1>
          </div>

          <div
            className="설명
            py-10 lg:pb-16 lg:pr-8 lg:pt-6 
            border-2 border-blue-500
            
            lg:row-start-2
            lg:col-start-1 
            lg:col-span-2 
            "
          >
            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
          </div>

          <Options product={product} />
        </div>
      </section>
    </main>
  );
}
