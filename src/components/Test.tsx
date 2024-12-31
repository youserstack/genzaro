"use client";
export default function Test() {
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          //   try {
          //     const res = await fetch("http://localhost:7000/api/auth/naver", {
          //       //   credentials: "include", // 쿠키를 요청에 포함
          //     });
          //     console.log({ res });
          //   } catch (error) {}
          window.location.href = "http://localhost:7000/api/auth/naver"; // 백엔드 서버로 리디렉션
        }}
      >
        test
      </button>
    </div>
  );
}
