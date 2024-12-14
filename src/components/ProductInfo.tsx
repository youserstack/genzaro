import Options from "./Options";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  return (
    <div
      className="ProductInfo 제품정보
      max-w-2xl lg:max-w-7xl mx-auto
      px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16
      lg:gap-x-8 
      /border-2 border-red-500

      lg:grid 
      lg:grid-rows-[auto_auto_1fr] 
      lg:grid-cols-3 
      "
    >
      <div
        className="Title 제목
        /border-2 border-purple-500 
        lg:pr-8

        lg:row-start-1
        lg:col-start-1
        lg:col-span-2
        "
      >
        <h1 className="text-2xl sm:text-3xl font-semibold ">{product.title}</h1>
      </div>

      <div
        className="Description 설명
        py-10 lg:pb-16 lg:pr-8 lg:pt-6 
        /border-2 border-blue-500
        
        lg:row-start-2
        lg:col-start-1 
        lg:col-span-2 
        "
      >
        <div className="space-y-6">
          <p className="text-base">{product.description}</p>
        </div>
      </div>

      <Options product={product} />
    </div>
  );
}
