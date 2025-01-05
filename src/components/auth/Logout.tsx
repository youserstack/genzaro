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
    <button onClick={handleSignout} className="px-4 py-2 hover:bg-neutral-100">
      로그아웃
    </button>
  );
}
