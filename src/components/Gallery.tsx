interface Props {
  product: Product;
}

export default function Gallery({ product }: Props) {
  return (
    <div
      className="
      max-w-2xl lg:max-w-7xl mx-auto mt-6
      lg:grid lg:gap-x-8 
      sm:px-6 lg:px-8 
      /border border-black/10
      "
    >
      <img
        alt={""}
        src={product.image}
        className="
        aspect-[4/3] lg:aspect-[16/9] 
        size-full object-cover 
        sm:border sm:rounded-lg lg:rounded-2xl border-neutral-200
        "
      />
    </div>
  );
}
