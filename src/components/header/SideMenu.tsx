import Link from "next/link";
import { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Context } from "../context/Context";

export default function SideMenu() {
  const { open, setOpen } = useContext(Context);

  return (
    <div
      className="Side_Menu 
      fixed md:hidden font-semibold z-[200]"
    >
      <div
        className={`Background_Layer 
        fixed inset-0 bg-black z-[200]
        transition-opacity duration-[0.7s] ease-in-out
        ${open ? "opacity-50" : "opacity-0 pointer-events-none"} `}
        onClick={() => setOpen(false)}
      />

      <div
        className={`Drawer_Layer
        x-layer-color
        ${open ? "translate-x-0:" : "-translate-x-full"}
        fixed top-0 left-0 w-full h-full max-w-xs basis-full grow z-[200]
        transition-all duration-300 transform 
        /overflow-hidden /overflow-y-auto 
        p-2 space-y-4 `}
      >
        <div className="Menu_Header p-2 flex justify-between items-center">
          <h3 className="font-bold">모바일 메뉴</h3>

          <button
            className="닫기버튼 size-8 inline-flex justify-center items-center gap-x-2 rounded-full hover:bg-neutral-200  dark:hover:bg-neutral-600"
            type="button"
            onClick={() => setOpen(false)}
          >
            <IoCloseOutline className="w-full h-full" />
          </button>
        </div>

        <ul className="Menu_List flex flex-col gap-0.5">
          <Link
            href={"#home"}
            onClick={() => setOpen(false)}
            className="x-item p-2 flex items-center text-sm rounded-lg "
          >
            <svg
              className="size-4 me-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </Link>

          <Link
            href={"#works"}
            onClick={() => setOpen(false)}
            className="x-item p-2 flex items-center text-sm rounded-lg"
          >
            <svg
              className="size-4 me-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12h.01" />
              <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <path d="M22 13a18.15 18.15 0 0 1-20 0" />
              <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
            Works
          </Link>

          <Link
            href={"#about"}
            onClick={() => setOpen(false)}
            className="x-item p-2 flex items-center text-sm rounded-lg"
          >
            <svg
              className="size-4 me-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            About
          </Link>
        </ul>
      </div>
    </div>
  );
}
