import { IoIosStar } from "react-icons/io";

interface Props {
  reviews: {
    href: string;
    average: number;
    totalCount: number;
  };
}

export default function Reviews({ reviews }: Props) {
  return (
    <div className="Reviews 리뷰 flex items-center">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <IoIosStar
            key={rating}
            className={`${reviews.average > rating ? "text-amber-500" : "text-gray-200"}
                "size-5 shrink-0"
              `}
          />
        ))}
      </div>
      <a
        href={reviews.href}
        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        {reviews.totalCount} reviews
      </a>
    </div>
  );
}
