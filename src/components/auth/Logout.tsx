"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      // const res = await fetch("/api/auth/logout", { credentials: "include" });
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
