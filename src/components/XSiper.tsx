"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination, Parallax } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const items = [
  // iphones
  // {
  //   bgUrl: "",
  //   imageUrl: "https://inventstore.in/wp-content/uploads/2023/04/iPhone_13_Midnight_-768x768.webp",
  // },
  // {
  //   bgUrl:
  //     "https://inventstore.in/wp-content/themes/invent/iphone-6-pro-img/hero_glow_large.png?600029ca8840",
  //   imageUrl: "https://inventstore.in/wp-content/uploads/2024/09/69-600x600.webp",
  // },

  // iwatches
  // {
  //   bgUrl: "",
  //   imageUrl: "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg",
  // },

  // cocacola
  {
    bgUrl: "",
    imageUrl:
      "https://eg.coca-colahellenic.com/en/our-24-7-portfolio/brands/coca-cola/_jcr_content/root/sectionteaser_image/container_585461450/teaser.coreimg.png/1675926600758/coca-cola-original.png",
  },

  // macdonalds
  {
    bgUrl: "",
    imageUrl: "https://www.mcdonalds.co.kr/upload/product/pcfile/1723564106957.png",
  },

  // netflix
  // {
  //   bgUrl:
  //     "https://inventstore.in/wp-content/themes/invent/iphone-6-pro-img/hero_glow_large.png?600029ca8840",
  //   imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  // },

  // {
  //   bgUrl: "",
  //   imageUrl: "https://www.mcdonalds.co.kr/upload/product/pcfile/1583727855319.png",
  // },
];

const url: string =
  "https://blog-next-app.tooroo.rf.gd/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzktdrw7o%2Fimage%2Fupload%2Fv1731244673%2Fblog-next-app%2Fjvbqapd33yo6sz8zdrgi.webp&w=1080&q=75";

const Background = ({ bgUrl }: { bgUrl: string }) => {
  console.log({ bgUrl });
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
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!flex !justify-center !items-center">
            <Background bgUrl={item.bgUrl || url} />
            <Image
              src={item.imageUrl}
              alt=""
              width={500}
              height={500}
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
