const menuItems = [
  {
    title: "안내",
    links: [
      { label: "멤버가입", href: "" },
      { label: "매장찾기", href: "" },
      { label: "젠자로", href: "" },
    ],
  },
  {
    title: "고객센터",
    links: [
      { label: "주문배송조회", href: "" },
      { label: "반품 정책", href: "" },
      { label: "결제 방법", href: "" },
      { label: "공지사항", href: "" },
      { label: "문의하기", href: "" },
    ],
  },
  {
    title: "회사소개",
    links: [
      { label: "About Genzaro", href: "" },
      { label: "소식", href: "" },
      { label: "채용", href: "" },
      { label: "투자자", href: "" },
      { label: "지속가능성", href: "" },
      { label: "신고하기", href: "" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-32
      bg-gradient-to-r from-emerald-500 to-sky-500 text-white"
    >
      <section
        className="
        max-w-screen-xl mx-auto sm:px-8 
        flex flex-wrap justify-between [row-gap:4rem] 
        #breakpoints sm:grid sm:grid-cols-5 
        "
      >
        <div className="p-4 space-y-4">
          <h1 className="font-semibold text-3xl tracking-[7px] uppercase">genzaro</h1>

          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore rerum eos voluptatum,
            soluta fugiat libero!
          </p>
        </div>

        <div
          className="
          w-full whitespace-nowrap
          col-start-3 col-end-6 
          #breakpoints grid grid-cols-2 sm:grid-cols-3 gap-4
          "
        >
          {menuItems.map((menu, index) => (
            <div key={index} className="p-4 space-y-4">
              <h2 className="text-lg font-bold">{menu.title}</h2>

              {menu.links.map((link, index) => (
                <span key={index} className="block hover:text-lime-300 transition cursor-pointer">
                  {link.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto mt-16 sm:px-8">
        <p className="text-sm px-4">© 2024 youserstack. all rights reserved.</p>
      </section>
    </footer>
  );
}
