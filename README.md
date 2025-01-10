# GENZARO

- frontend: https://genzaro.vercel.app
- backend: 비공개

이 프로젝트는 가상의 이커머스 웹 애플리케이션입니다. 사용자는 상품을 탐색하고 장바구니에 담고 결제를 해서 구매를 할 수 있습니다.
프론트엔드와 백엔드가 독립적으로 분리되있습니다. 프론트엔드는 nextjs로 작성되었고, 백엔드는 expressjs로 작성되었습니다. 백엔드는 nextjs api routes가 아니라 외부 api 서버입니다.

## 주요기능

##### frontend (vercel deployment)

- 상품탐색
- 장바구니
- 결제
- 주문내역
- reverse proxy (모든 데이터를 백엔드로 요청)

##### backend (외부 api, vercel deployment)

- 인증(oauth2.0)
- 주문데이터
- 제품데이터

## 기술스택

##### frontend

- nextjs
- typescript
- tailwindcss
- context
- swiper
- paypal

##### backend (외부 api)

- express
- typescript
- ts-node
- mongodb
- mongoose
- passport
- passport-naver

## 파일구조

```
└── 📁genzaro
    └── 📁public
    └── 📁src
        └── 📁app
            └── 📁cart
            └── 📁checkout
            └── 📁orders
            └── 📁signin
            └── 📁products
                └── 📁[id]
            └── favicon.ico
            └── globals.css
            └── layout.tsx
            └── page.tsx
        └── 📁components
            └── 📁context
                └── 📁cart
                    └── CartContext.tsx
                └── 📁checkout
                    └── CheckoutContext.tsx
                └── Context.tsx
            └── 📁auth
                └── GeneralSigninForm.tsx
                └── Logout.tsx
                └── UserMenu.tsx
            └── 📁cart
                └── CartIcon.tsx
                └── GroupedProductsBySeller.tsx
                └── OrderEditModal.tsx
            └── 📁product
                └── Breadcrumb.tsx
                └── Colors.tsx
                └── Gallery.tsx
                └── MoreProductList.tsx
                └── Options.tsx
                └── ProductInfo.tsx
                └── ProductList.tsx
                └── QuantityAndTotal.tsx
                └── Reviews.tsx
                └── Sizes.tsx
            └── 📁header
                └── Burger.tsx
                └── Header.tsx
                └── Logo.tsx
                └── Nav.tsx
                └── SideMenu.tsx
            └── 📁footer
                └── Footer.tsx
            └── Carousel.tsx
            └── RecommendedProductList.tsx
            └── Row.tsx
        └── 📁data
            └── navData.ts
            └── productData.ts
        └── middleware.ts
        └── 📁types
            └── global.d.ts
        └── 📁utils
            └── currencyConverter.ts
            └── fetchAPI.ts
            └── formatPrice.ts
            └── postOrder.ts
    └── .env
    └── .eslintrc.json
    └── .gitignore
    └── next-env.d.ts
    └── next.config.ts
    └── package-lock.json
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.ts
    └── tsconfig.json
```

## 코드스타일

```tsx
// server component
export default async function Home() {
  const latestProducts = await fetchAPI("products?sort=latest");
  const poppularProducts = await fetchAPI("products?sort=popular");

  return (
    <main>
      <section className="pt-[50px] md:pt-[40px]">
        <Carousel />
      </section>

      <section
        className="max-w-screen-xl min-h-screen mx-auto py-[100px] 
        flex flex-col justify-center items-center"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-semibold text-center mb-[100px] whitespace-pre"
        >
          최신상품
        </h1>

        <MoreProductList initialProducts={latestProducts} />
      </section>

      <section
        className="max-w-screen-xl min-h-screen mx-auto py-[100px] 
        flex flex-col justify-center items-center"
      >
        <RecommendedProductList products={poppularProducts} />
      </section>
    </main>
  );
}
```

```tsx
// client component
"use client";
export default function Cart() {
  const { cart } = useContext(CartContext);
  const { items } = cart;
  const [groupes, setGroupes] = useState<Record<string, GroupedProduct[]>>({});

  useEffect(() => {
    if (!items.length) {
      setGroupes({});
      return;
    }

    const getProducts = async () => {
      // 유니크한 제품아이디를 추출하고 쿼리파라미터를 셋팅
      const productIds = [...new Set(items.map((item) => item.productId))];
      const searchParams = new URLSearchParams();
      productIds.forEach((id) => {
        searchParams.append("ids", id);
      });

      try {
        // 제품데이터 패칭
        const res = await fetch(`/api/products?${searchParams.toString()}`);
        const products: Product[] = await res.json();
        // console.log({ products });

        // 그룹핑
        const groupedProductMap = new Map<string, GroupedProduct[]>();
        products.forEach((product) => {
          // 값에 병합할 카트아이템을 추출
          const cartItems = items.filter((item) => item.productId === product._id);

          if (!groupedProductMap.has(product.seller)) {
            groupedProductMap.set(product.seller, []);
          }

          // 병합과 추가
          groupedProductMap
            .get(product.seller)
            ?.push({ seller: product.seller, product, items: cartItems });
        });
        // console.log({ groupedProductMap });
        const groupes = Object.fromEntries(groupedProductMap);

        setGroupes(groupes);
      } catch (error) {
        console.error("카트페이지 제품데이터 패칭에러", error);
      }
    };

    getProducts();
  }, [items]);

  return (
    <main className="bg-neutral-50">
      <section className="max-w-screen-xl min-h-screen mx-auto pt-[100px]">
        <ul className="List 리스트 max-w-4xl mx-auto space-y-4 px-4 sm:px-6 md:px-8">
          {Object.entries(groupes).map(([seller, products]) => (
            <GroupedProductsBySeller key={seller} seller={seller} products={products} />
          ))}
        </ul>
      </section>
    </main>
  );
}
```
