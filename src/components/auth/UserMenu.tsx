import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { getUser } from "@/utils/getUser";

export default async function UserMenu() {
  let user = null;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("connect.sid");
  if (sessionCookie) {
    try {
      user = await getUser(sessionCookie);
    } catch (error) {
      user = null;
    }
  }
  console.log({ user });

  return (
    <>
      {user ? (
        <div className="UserMenu 유저메뉴 relative flex group">
          <div
            className="ImageContainer
            rounded-full overflow-hidden size-8 /peer
            cursor-pointer
            hover:ring-2 hover:ring-amber-300 transition-all duration-300
            "
          >
            <Image src={user.image || ""} alt="" width={100} height={100} />
          </div>

          <div
            className="PositionLayer 포지션레이어
            #position absolute top-full right-0
            hidden group-hover:block /peer-hover:block /hover:block
            pt-2
            "
          >
            <div
              className="ModalLayer 모달레이어 
              divide-y
              border border-neutral-200 bg-white shadow-md text-black p-4 rounded-md
              "
            >
              <ul className="pb-2 space-y-2">
                <li>내 정보</li>
                <li>대시보드</li>
                <li>관심상품</li>
                <li>주문내역</li>
              </ul>

              <div className="pt-2">
                <Logout />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={"/signin"}
          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1 rounded-md text-sm"
        >
          로그인
        </Link>
      )}
    </>
  );
  // return (
  //   <>
  //     {sessionCookie && user ? (
  //       <div className="UserMenu 유저메뉴 relative flex group">
  //         <div
  //           className="ImageContainer
  //           rounded-full overflow-hidden size-8 /peer
  //           cursor-pointer
  //           hover:ring-2 hover:ring-amber-300 transition-all duration-300
  //           "
  //         >
  //           <Image src={user.image || ""} alt="" width={100} height={100} />
  //         </div>

  //         <div
  //           className="PositionLayer 포지션레이어
  //           #position absolute top-full right-0
  //           hidden group-hover:block /peer-hover:block /hover:block
  //           pt-2
  //           "
  //         >
  //           <div className="ModalLayer 모달레이어 border border-neutral-200 bg-white shadow-md text-black p-4 rounded-md">
  //             <ul>
  //               <li>내 정보</li>
  //               <li>대시보드</li>
  //               <li>관심상품</li>
  //               <li>주문내역</li>
  //             </ul>

  //             <Logout />
  //           </div>
  //         </div>
  //       </div>
  //     ) : (
  //       <Link
  //         href={"/signin"}
  //         className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1 rounded-md text-sm"
  //       >
  //         로그인
  //       </Link>
  //     )}
  //   </>
  // );
}
// "use client";
// import { useEffect, useState } from "react";
// const [user, setUser]: any = useState(null);
// useEffect(() => {
//   (async function getProfile() {
//     try {
//       const res = await fetch("/api/profile");
//       const { user } = await res.json();
//       console.log({ user });
//       setUser(user);
//     } catch (error) {
//       console.log({ error });
//     }
//   })();
// }, []);
