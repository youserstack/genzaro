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
    bg: "https://imageproxy.wolt.com/venue/5af0754862efb5000c096232/4e08e07a-4ead-11ec-9874-8a1d5b3d7604_mcdonalds4.jpg",
  },
  {
    name: "adidas",
    svg: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png",
    items: [""],
    bg: "https://report.adidas-group.com/2022/en/_assets/gallery/mag-2-hero.jpg",
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
    bg: "https://rtlimages.apple.com/cmc/dieter/store/16_9/R411.png?resize=2880:1612&output-format=jpg&output-quality=85&interpolation=progressive-bicubic",
  },
  {
    name: "h&m",
    svg: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png",
    items: [""],
    bg: "https://mymerryhill.co.uk/wp-content/uploads/2022/12/Mhill-HM-11-1024x683.jpg",
  },
  {
    name: "cocacola",
    svg: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png",
    items: [
      "https://eg.coca-colahellenic.com/en/our-24-7-portfolio/brands/coca-cola/_jcr_content/root/sectionteaser_image/container_585461450/teaser.coreimg.png/1675926600758/coca-cola-original.png",
    ],
    bg: "https://img.favpng.com/25/4/12/coca-cola-fizzy-drinks-pepsi-desktop-wallpaper-png-favpng-CfQJANGvAZN54jqtd2vfHknk2.jpg",
  },
  {
    name: "nike",
    svg: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png",
    items: [""],
    bg: "https://static.nike.com/a/images/f_auto/d9bece9b-3597-431a-ac8e-3b3754443c82/image.jpeg",
  },
  {
    name: "netflix",
    svg: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    items: [""],
    bg: "https://s3.amazonaws.com/prod-cdata-secure.sprinklr.com/DAM/3877/c403c07b-df03-4039-bee7-1a0dd7b449bd-227725003/what_is_netflix_5_en.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIA25fEQFDliaeGPiqv0wtQGtNtCSe%2BBOFNM0qLQ2AWsMAiEAmfx1nCTPit6vdXYuTSqDBSTcYy5siAZWbOujnrvu0BUquwUImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NjkzNjc0NzE2NzQiDMql%2B0xdUcz8J6ZhziqPBXOdd1EKC2bt6rVEzZkY9xRX%2FGTk4YuoVgAZp0q6PE4PE1NHkp%2Fzi4cgYdp6IhScANGjG45Pbytfx%2F%2BovFO5Z%2BdmKvbU0hcne8p6bqq1LoL8D%2FzE2d2IN%2BoKmCCaVeBF4lSOWYkYgDSUfpPme4qGA6vKcoEOZiqvmJntENNrznOwcf14a%2BNFqTMW50GCYHiUFu3I9pJDdycAh3TyLX9FUWGP37Y3gxAgnuTP6slcUncNSPexmGjvDl%2Fuim3VoD0B7xBhn3WKF30sUnyCYm%2BAT7TZSoNrbDozA9%2BrSyLc7tRAYJ4%2FiKOrd5KhasDtf%2B4dVz%2B7Zr8Sm4lxVfKue1Rj2BzMtlF0cglNyGBJR4M4NzjcpFyesD9WD%2FIuyiZGDPoKjR3QRGbdG6tLsV5RZM%2BYighpyjR8uIxmAqby3FnRKeTAD%2FXk3QGT7wd357prHS9lLNdP4OFVrdqv5ezXbAVxhD4MFZyynArukUVi9IuUu891qi0Wpg6TQrpt8rxpwOREEJXmN6YctntL%2BZyZQJDl5MI0hhlWeItbnPy8M3zdEiFqeO1Xs9Qk6UZB6EwTcDX%2BlPQoU0uaRcGoIaT%2F2l8me7tcGDDUy3IJx%2Btlv8efKDcrp1M9BNMsXODe6OPdG5RbBVrhHAOg9XTm2RspnB82MBCa7pneyu8sfyObg5ZIBej4ar8QwOA6JlFNIfukk1juA2274eJjKzpUpEmoapRPOu3clc3fD0U0eydJGO4CzWY0nuejkRcqEtGXMbhYoFWzgg%2B%2BGCyeQvKOqBF03BgGzRIQCPEEV2QRl1Z8yUroAqWo9mUdkzyM8m7nh1bRVN3J%2B%2F3ta%2BGYem4lUtr%2FdbcW25EqtXBlnSp3XMJ%2BZlqd3Cgw%2BMbjugY6sQFkoL5bmxdQneQ%2B0vwOe8O9KqcMgLpDHNQfctrLY1Wa6H65%2FExR4RbYqdKo0dcpdIK%2B9CQYiART8KIXts2ELHt6ghRWjFjK2TfUuQZ%2F6k1i25RTsAEtS%2FHLpjMfFBGAajcMcgRe96%2BbADYCzB9toIitONEVyBp5%2F%2Fd61UJ3cxotclrXh8lHkt%2F8nFK4hT1hO%2BmJ7wjrHeDoHM%2BDv25X3u%2BrVlsKuSKgM8Meu%2B0H5SBfx9M%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241211T014015Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=ASIA4U2SW3Y5C6WIPGNP%2F20241211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=27d970b681075da832708736c671a3991dafb7ca3a7f4b95c168acfebd96a7a1",
  },
  {
    name: "tesla",
    svg: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    png: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1587px-Tesla_Motors.svg.png",
    items: [
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/54583/2024-Tesla-Cybertruck-front_54583_032_1585x661_EVOX01_cropped.png",
      "https://rk-se.s3.us-west-2.amazonaws.com/ev/vehicles/2024_Tesla_Cybertruck_Tri_Motor_AWD_Cyberbeast_All_Wheel_Drive_BEV_01.png",
    ],
    bg: "https://hips.hearstapps.com/hmg-prod/images/2025-tesla-cybertruck-3-672e75cce7814.jpg?crop=0.607xw:0.512xh;0.0994xw,0.399xh&resize=1200:*",
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
        width={1200}
        height={1200}
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
