type Item = {
  seller: string;
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
  [key: string]: string | number | undefined;
};

type Product = {
  _id: string;
  productId: string;
  productType: string;
  price: string;
  title: string;
  image: string;
  brand: string;
  maker: string;
  seller: string;
  description: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  // link: string;
  // lprice: string;
  // hprice: string;
  // mallName: string;
};
