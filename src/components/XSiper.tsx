"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination, Parallax } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const brands = [
  {
    name: "mcdonals",
    svg: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2339px-McDonald%27s_Golden_Arches.svg.png",
    items: ["https://www.mcdonalds.co.kr/upload/product/pcfile/1723564106957.png"],
    bg: "",
  },
  {
    name: "adidas",
    svg: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png",
    items: [""],
    bg: "",
  },
  {
    name: "apple",
    svg: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    items: [
      "https://inventstore.in/wp-content/uploads/2023/04/iPhone_13_Midnight_-768x768.webp",
      "https://inventstore.in/wp-content/uploads/2024/09/69-600x600.webp",
      "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg",
    ],
    bg: "https://inventstore.in/wp-content/themes/invent/iphone-6-pro-img/hero_glow_large.png?600029ca8840",
  },
  {
    name: "h&m",
    svg: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png",
    items: [""],
    bg: "",
  },
  {
    name: "cocacola",
    svg: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png",
    items: [
      "https://eg.coca-colahellenic.com/en/our-24-7-portfolio/brands/coca-cola/_jcr_content/root/sectionteaser_image/container_585461450/teaser.coreimg.png/1675926600758/coca-cola-original.png",
    ],
    bg: "",
  },
  {
    name: "nike",
    svg: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png",
    items: [""],
    bg: "",
  },
  {
    name: "netflix",
    svg: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    items: [""],
    bg: "",
  },
  {
    name: "tesla",
    svg: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1587px-Tesla_Motors.svg.png",
    items: [
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/54583/2024-Tesla-Cybertruck-front_54583_032_1585x661_EVOX01_cropped.png",
      "https://rk-se.s3.us-west-2.amazonaws.com/ev/vehicles/2024_Tesla_Cybertruck_Tri_Motor_AWD_Cyberbeast_All_Wheel_Drive_BEV_01.png",
    ],
    bg: "",
  },
  // {
  //   name: "",
  //   svg: "",
  //   png: "",
  //   items: [""],
  //   bg: "",
  // },
  // {
  //   name: "",
  //   svg: "",
  //   png: "",
  //   items: [""],
  //   bg: "",
  // },
  // {
  //   name: "",
  //   svg: "",
  //   png: "",
  //   items: [""],
  //   bg: "",
  // },
  // {
  //   name: "",
  //   svg: "",
  //   png: "",
  //   items: [""],
  //   bg: "",
  // },
];

const items = [
  {
    bgUrl: "",
    imageUrl: "https://www.mcdonalds.co.kr/upload/product/pcfile/1583727855319.png",
  },
  {
    bgUrl: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
  {
    bgUrl: "",
    imageUrl: "https://www.mcdonalds.co.kr/upload/product/pcfile/1583727855319.png",
  },
  {
    bgUrl: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
  {
    bgUrl: "",
    imageUrl: "https://www.mcdonalds.co.kr/upload/product/pcfile/1583727855319.png",
  },
  {
    bgUrl: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
];

const url: string =
  "https://blog-next-app.tooroo.rf.gd/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzktdrw7o%2Fimage%2Fupload%2Fv1731244673%2Fblog-next-app%2Fjvbqapd33yo6sz8zdrgi.webp&w=1080&q=75";

const Background = ({ bgUrl }: { bgUrl: string }) => {
  // console.log({ bgUrl });
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={bgUrl}
        alt=""
        width={500}
        height={500}
        className="
        w-[130%] max-w-[130%] h-full 
        absolute left-[-15%]
        object-center object-cover "
        data-swiper-parallax="-10%"
      />
    </div>
  );
};

export default function XSiper() {
  return (
    <Swiper
      className="h-[500px]"
      modules={[Navigation, Pagination, Keyboard, Parallax, Autoplay]}
      navigation={{
        //
        enabled: true,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        el: ".swiper-pagination",
        type: "bullets", // 기본값
        clickable: true, // 점 클릭 시 슬라이드 이동 가능
        renderBullet: (index, className) =>
          `<span class="${className} !w-[10px] !h-[10px] !bg-white !mx-2"></span>`,
      }}
      keyboard={{ enabled: true }}
      slidesPerView={1.5}
      speed={700}
      centeredSlides
      parallax
      loop

      // spaceBetween={70}
      // autoplay={{ delay: 1000 }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {/* swiper slides */}
      <div>
        {brands.map((brand, index) => (
          <SwiperSlide
            key={brand.name}
            className="!flex !justify-center !items-center"
            title={brand.name}
          >
            <Background bgUrl={brand.bg || url} />
            <Image
              src={brand.svg || brand.png || brand.items[0]}
              alt=""
              width={300}
              height={300}
              className="/h-full object-center object-cover"
              data-swiper-parallax="-300"
            />
          </SwiperSlide>
        ))}
      </div>

      {/* navigation arrow buttons */}
      <IoIosArrowBack className="swiper-button-prev !text-white" />
      <IoIosArrowForward className="swiper-button-next !text-white" />

      {/* pagination bullet buttons */}
      <div className="swiper-pagination !bottom-[10%]"></div>
    </Swiper>
  );
}
