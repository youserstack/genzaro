"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk, SiNaver } from "react-icons/si";

const Header = () => (
  <div className="text-center">
    <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">계정 로그인</h1>
    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
      계정이 없으신가요?
      <a
        className="ml-2 text-blue-600 decoration-2 hover:underline 
        focus:outline-none focus:underline font-medium dark:text-blue-500"
      >
        여기에서 가입하세요
      </a>
    </p>
  </div>
);

const Partition = () => (
  <div
    className="파티션 flex items-center py-3 text-xs uppercase 
  text-neutral-400 dark:text-neutral-500 
    before:flex-1 before:border-t before:border-neutral-200 before:me-6 
    after:flex-1 after:border-t after:border-neutral-200 after:ms-6 
  dark:before:border-neutral-600 dark:after:border-neutral-600"
  >
    Or
  </div>
);

const items = [
  { id: "google", icon: <FcGoogle className="w-[1.2rem] h-auto" />, label: "구글로 로그인" },
  {
    id: "naver",
    icon: <SiNaver className="w-[0.8rem] h-auto text-[#03C75A]" />,
    label: "네이버로 로그인",
  },
  {
    id: "kakao",
    icon: <SiKakaotalk className="w-[1rem] h-auto  text-[#FEE500]" />,
    label: "카카오로 로그인",
  },
];

export default function Signin() {
  const handleSignin = async (item: (typeof items)[number]) => {
    await signIn(item.id, { redirect: true, callbackUrl: "/callback" });
  };

  return (
    <main className="min-h-screen pt-[150px]">
      <section className="max-w-screen-lg px-4 py-12 lg:px-8">
        <div
          className="로그인_박스 w-[300px] mx-auto sm:w-[400px] p-4 sm:p-7 mt-7 
          shadow-sm border rounded-xl
          bg-white dark:bg-neutral-900
          border-neutral-200 dark:border-neutral-700"
        >
          <Header />

          <div className="mt-5">
            <div className="Oauth flex flex-col gap-2">
              {items.map((item) => (
                <button
                  className="
                  #size w-full px-4 py-3 
                  #deco text-sm font-medium rounded-lg border shadow-sm 
                  #display inline-flex justify-center items-center gap-x-2 
                  focus:outline-none  
                  disabled:opacity-50 
                  disabled:pointer-events-none 
                  text-neutral-800 
                  bg-white 
                  hover:bg-neutral-50 
                  focus:bg-neutral-50
                  border-neutral-200
                  dark:bg-neutral-900 
                  dark:hover:bg-neutral-800 
                  dark:focus:bg-neutral-800
                  dark:border-neutral-700 
                  dark:text-white 
                  "
                  type="button"
                  key={item.id}
                  onClick={() => handleSignin(item)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* <Partition />
            <GeneralSigninForm /> */}
          </div>
        </div>
      </section>
    </main>
  );
}
