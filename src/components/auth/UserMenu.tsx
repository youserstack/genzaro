import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function UserMenu() {
  // 토큰추출과 토큰디코딩
  const headersList = await headers();
  const token = headersList.get("token") as string;
  const user = JSON.parse(Buffer.from(token, "base64url").toString("utf-8"));
  console.log({ user });

  return (
    <>
      {user ? (
        <div className="Profile 프로필 relative ">
          <Image
            src={user.picture || ""}
            alt=""
            width={100}
            height={100}
            className="size-8 rounded-full"
          />
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
