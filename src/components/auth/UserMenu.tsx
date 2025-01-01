import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Temp from "./Temp";

export default async function UserMenu() {
  // 토큰추출과 토큰디코딩
  // const headersList = await headers();
  // const token = headersList.get("token") as string;
  // const user = token ? JSON.parse(Buffer.from(token, "base64url").toString("utf-8")) : null;
  // console.log({ user });

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("connect.sid");

  const res = await fetch("http://localhost:7000/api/profile", {
    headers: { Cookie: `connect.sid=${sessionId?.value}` }, // 노드환경에서동작
  });
  const { user } = await res.json();
  console.log({ user });

  return (
    <>
      {sessionId && user ? (
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
            <div className="ModalLayer 모달레이어 border border-neutral-200 bg-white shadow-md text-black p-4 rounded-md">
              <ul>
                <li>내 정보</li>
                <li>대시보드</li>
                <li>관심상품</li>
                <li>주문내역</li>
              </ul>

              <Temp />
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
}
// return (
//   <>
//     {user ? (
//       <div className="UserMenu 유저메뉴 relative flex group">
//         <div
//           className="ImageContainer
//           rounded-full overflow-hidden size-8 /peer
//           cursor-pointer
//           hover:ring-2 hover:ring-amber-300 transition-all duration-300
//           "
//         >
//           <Image src={user.image || ""} alt="" width={100} height={100} />
//           {/* <Image src={user.picture || ""} alt="" width={100} height={100} /> */}
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
