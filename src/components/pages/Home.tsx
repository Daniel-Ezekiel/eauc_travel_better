import { AssessmentCard } from "../AssessmentCard";
import { MainLayout } from "../layout/MainLayout";
import assessmentsData from "../../assets/assessments_config.json";
import { Link } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";

export const Home = ({ results }: { results: object }) => {
  const isResultsAvailable = Object.values(results).every(
    (result) => Object.keys(result).length,
  );

  const { data } = assessmentsData;

  return (
    <MainLayout>
      <section className="mt-4 py-4 flex flex-col items-center gap-4 md:items-start">
        <h1 className="font-medium text-4xl text-midnight sm:text-5xl">
          Air Travel Justification Tool
        </h1>
        <p className="">
          This reflective tool is designed to help you evaluate the necessity of
          flying to academic conferences and meetings. Rather than asking you to
          completely eliminate air travel, it guides you through a series of
          short assessments to weigh the professional benefits of your trip
          against its environmental impact. Use this tool to make conscious,
          sustainable travel choices that support global sustainability goals.
        </p>

        <div className="w-full h-0.5 mt-4 bg-lagoon rounded-full">&nbsp;</div>
      </section>

      <section className="max-w-300 mx-auto mt-4 grid gap-8 place-content-center md:grid-cols-2 lg:grid-cols-3">
        {data.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            url={assessment.id}
            title={assessment.title}
            description={assessment.description}
            questionsCount={assessment.questions.length}
          />
        ))}
        {isResultsAvailable && (
          <Link
            to={`/assessment_results`}
            className="place-self-center flex items-center gap-2 cursor-pointer py-2 px-5 bg-midnight text-sandstone-tint rounded-r-full"
          >
            View All Results <FaArrowRightLong />
          </Link>
        )}
      </section>
    </MainLayout>
  );
};
