interface Props {
  product: Product;
}

export default function Gallery({ product }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <img
        alt={""}
        src={product.image}
        className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block border border-red-500"
      />
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <img
          alt={""}
          src={product.image}
          className="aspect-[3/2] size-full rounded-lg object-cover"
        />
        <img
          alt={""}
          src={product.image}
          className="aspect-[3/2] size-full rounded-lg object-cover"
        />
      </div>
      <img
        alt={""}
        src={product.image}
        className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4] border border-blue-500"
      />
    </div>
  );
}
