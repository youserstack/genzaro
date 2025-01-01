"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// export default async function Temp() {
//   const [user, setUser]: any = useState(null);

//   useEffect(() => {
//     const handleFetch = async () => {
//       try {
//         const res = await fetch("http://localhost:7000/api/profile", { credentials: "include" });
//         const data = await res.json();
//         console.log({ data });
//         if (res.ok) {
//           setUser(data.user);
//         }
//       } catch (error) {}
//     };
//     handleFetch();
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="UserMenu 유저메뉴 relative flex group">
//       <div
//         className="ImageContainer
//               rounded-full overflow-hidden size-8 /peer
//               cursor-pointer
//               hover:ring-2 hover:ring-amber-300 transition-all duration-300
//               "
//       >
//         <Image src={user.image || ""} alt="" width={100} height={100} />
//       </div>

//       <div
//         className="PositionLayer 포지션레이어
//               #position absolute top-full right-0
//               hidden group-hover:block /peer-hover:block /hover:block
//               pt-2
//               "
//       >
//         <div className="ModalLayer 모달레이어 border border-neutral-200 bg-white shadow-md text-black p-4 rounded-md">
//           <ul>
//             <li>내 정보</li>
//             <li>대시보드</li>
//             <li>관심상품</li>
//             <li>주문내역</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Temp() {
  const router = useRouter();

  const handleSignout1 = async () => {
    // try {
    //   const res2 = await fetch("http://localhost:7000/api/auth/logout");
    //   const data2 = await res2.json();

    //   const res = await fetch("/api/logout", { credentials: "include" });
    //   const data = await res.json();

    //   console.log({ data, data2 });
    // } catch (error) {
    //   console.error(error);
    // }
    router.push("http://localhost:7000/api/auth/logout");

    // try {
    //   const res = await fetch("http://localhost:7000/api/auth/logout", {
    //     credentials: "include",
    //   });
    //   console.log({ res });
    //   if (!res.ok) {
    //     throw new Error("로그아웃에러1");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

    // try {
    //   const res = await fetch("/api/logout", { credentials: "include" });
    //   console.log({ res });
    //   if (!res.ok) {
    //     throw new Error("로그아웃에러2");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { credentials: "include" });
      if (!res.ok) throw new Error("로그아웃에러발생");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>로그아웃</button>
    </div>
  );
}
