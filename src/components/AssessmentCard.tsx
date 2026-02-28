import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

export const AssessmentCard = ({
  title,
  url,
  description,
  questionsCount,
}: {
  title: string;
  url: string;
  description: string;
  questionsCount: number;
}) => {
  return (
    <div className="grid gap-4 p-6 bg-sandstone text-slate rounded-[1.25rem] rounded-br-none shadow-xl">
      <h2 className="font-medium text-2xl text-midnight">{title}</h2>
      <p>{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-medium">{questionsCount} Questions</span>
        <Link
          to={url}
          className="px-4 py-2 flex justify-between items-center gap-2 bg-sandstone-tint font-medium text-midnight rounded-full rounded-l-none cursor-pointer"
        >
          Begin <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};
