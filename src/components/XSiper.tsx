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
  {
    bgUrl: "",
    imageUrl: "https://inventstore.in/wp-content/uploads/2023/04/iPhone_13_Midnight_-768x768.webp",
  },
  {
    bgUrl: "",
    imageUrl: "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg",
  },
  {
    bgUrl: "",
    imageUrl: "https://shopping-phinf.pstatic.net/main_2857304/28573043554.20241023085934.jpg",
  },
  {
    bgUrl: "",
    imageUrl: "https://inventstore.in/wp-content/uploads/2023/04/iPhone_13_Midnight_-768x768.webp",
  },
  {
    bgUrl: "",
    imageUrl: "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg",
  },
  {
    bgUrl: "",
    imageUrl: "https://shopping-phinf.pstatic.net/main_2857304/28573043554.20241023085934.jpg",
  },
];

const url =
  "https://blog-next-app.tooroo.rf.gd/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzktdrw7o%2Fimage%2Fupload%2Fv1731244673%2Fblog-next-app%2Fjvbqapd33yo6sz8zdrgi.webp&w=1080&q=75";
// ;

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={url}
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
            <Background />
            <Image
              src={item.imageUrl}
              alt=""
              width={300}
              height={300}
              className="h-[80%] object-center object-cover"
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
