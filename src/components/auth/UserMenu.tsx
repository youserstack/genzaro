import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { getUser } from "@/utils/fetchAPI";

export default async function UserMenu() {
  let user: User | null = null;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("connect.sid");
  if (sessionCookie) {
    try {
      user = await getUser(sessionCookie);
    } catch (error) {
      console.error(error);
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
            absolute top-full right-0
            hidden group-hover:block /peer-hover:block /hover:block
            pt-2
            "
          >
            <div
              className="ModalLayer 모달레이어 
              divide-y
              border border-neutral-200 bg-white shadow-md text-black /p-4 rounded-md
              "
            >
              <ul
                className="flex flex-col
                [&_a]:block
                [&_a]:size-full
                [&_a]:px-4
                [&_a]:py-2
                [&_a:hover]:bg-neutral-100
                "
              >
                <li>
                  <Link href={""}>내 정보</Link>
                </li>
                <li>
                  <Link href={""}>대시보드</Link>
                </li>
                <li>
                  <Link href={""}>관심상품</Link>
                </li>
                <li>
                  <Link href={"/orders"}>주문내역</Link>
                </li>
              </ul>

              <Logout />
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
