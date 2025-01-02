"use client";

import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      // localhost:3000/api/auth/logout (reverse proxy)
      // => localhost:7000/api/auth/logout (redirected auth & resourece server) : 세션삭제
      // => localhost:3000/api/logout (redirected web server) : 쿠키삭제
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
