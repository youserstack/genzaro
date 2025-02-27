import { IoIosStar } from "react-icons/io";

type Props = {
  reviews: {
    href: string;
    average: number;
    totalCount: number;
  };
};

export default function Reviews({ reviews }: Props) {
  return (
    <div className="Reviews 리뷰 flex items-center">
      <div className="flex items-center gap-[3px]  text-lg">
        <IoIosStar className="text-amber-500 /size-5 " />
        {reviews.average}
        {/* {[0, 1, 2, 3, 4].map((rating) => (
          <IoIosStar
            key={rating}
            className={`${reviews.average > rating ? "text-amber-500" : "text-gray-200"}
                "size-5 shrink-0"
              `}
          />
        ))} */}
      </div>

      <a href={reviews.href} className="ml-3 text-sm font-medium text-sky-500 hover:text-sky-600">
        리뷰 {reviews.totalCount}
      </a>
    </div>
  );
}
