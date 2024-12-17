import Link from "next/link";

export default function Logo() {
  return (
    <Link
      className="로고 
      flex-none font-semibold text-xl 
      focus:outline-none focus:opacity-80"
      href={"/"}
    >
      logo
    </Link>
  );
}
