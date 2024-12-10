"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination, Parallax } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";

const url =
  "https://blog-next-app.tooroo.rf.gd/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzktdrw7o%2Fimage%2Fupload%2Fv1731244673%2Fblog-next-app%2Fjvbqapd33yo6sz8zdrgi.webp&w=1080&q=75";

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg">
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
    <div>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={70}
        modules={[Navigation, Pagination, Keyboard, Parallax, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        centeredSlides
        parallax
        loop
        speed={1200}

        // autoplay={{ delay: 1000 }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className="/bg-slate-300 ">
          <Background />
          <Image
            src={"https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"}
            alt=""
            width={400}
            height={400}
            className="w-full"
            data-swiper-parallax="-50%"
          />
        </SwiperSlide>
        <SwiperSlide className="/bg-slate-300 ">
          <Background />
          <Image
            src={"https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"}
            alt=""
            width={400}
            height={400}
            className="w-full"
            data-swiper-parallax="-50%"
          />
        </SwiperSlide>
        <SwiperSlide className="/bg-slate-300 ">
          <Background />
          <Image
            src={"https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"}
            alt=""
            width={400}
            height={400}
            className="w-full"
            data-swiper-parallax="-50%"
          />
        </SwiperSlide>
        <SwiperSlide className="/bg-slate-300 ">
          <Background />
          <Image
            src={"https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg"}
            alt=""
            width={400}
            height={400}
            className="w-full"
            data-swiper-parallax="-50%"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
