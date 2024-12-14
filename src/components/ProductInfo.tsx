import Options from "./Options";

interface Props {
  product: Product;
}

function Description({ product }: Props) {
  return (
    <div
      className="Description 설명
      /border-2 border-purple-500/30 

      lg:row-start-1 lg:row-span-2
      lg:col-start-1 lg:col-span-2
      lg:pr-8
      space-y-6
      "
    >
      <h1 className="text-2xl sm:text-3xl font-semibold ">{product.title}</h1>

      <p className="text-base">{product.description}</p>
    </div>
  );
}

export default function ProductInfo({ product }: Props) {
  return (
    <div
      className="ProductInfo 제품정보
      max-w-2xl lg:max-w-7xl mx-auto
      px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16
      lg:gap-x-8 
      /border border-red-500/30

      lg:grid 
      lg:grid-rows-[auto_auto_1fr] 
      lg:grid-cols-2 
      /lg:grid-cols-3 
      "
    >
      <Description product={product} />
      <Options product={product} />
    </div>
  );
}
