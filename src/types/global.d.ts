interface Item {
  // 불변속성
  seller: string;
  productId: string;
  price: number;
  // 가변속성
  quantity: number;
  total: number;
  [key: string]: string | number | undefined;
}

interface Product {
  _id: string;
  productId: string;
  productType: string;
  price: number;
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
}

interface GroupedProduct {
  seller: string;
  product: Product; // 팝퓰레잇될 제품
  items: Item[]; // 병합될 아이템들
}

interface ShippingInfo {
  method: "standard" | "express" | "same-day" | "scheduled" | "pickup-location";
  recipent: string;
  address: string;
  phone: string;
  cost: number;
  instructions?: string;
  message?: string;
  note?: string;
}

interface Checkout {
  products: GroupedProduct[];
  shippingInfo: ShippingInfo;
  total: number;
}

interface Order {
  _id?: string;
  products: GroupedProduct[];
  shippingInfo: ShippingInfo;
  paymentInfo: unknown;
}
