import type { AssessmentResults } from "../App";

export const ResultCard = ({
  result,
}: {
  result: AssessmentResults;
}) => {
  const outcome = result.outcome;

  console.log(result);

  return (
    <div className="p-8 grid place-items-start bg-sandstone rounded-[1.25rem] rounded-br-none text-midnight">
      <div className="grid place-items-start gap-2">
        <h2 className="font-medium text-3xl">{result.assessment_title}</h2>
        <p className="font-medium text-2xl">
          Your score: <span>{result.totalScore}</span>
        </p>
        <div className="grid gap-4">
          <h3 className="font-medium">What a score between {outcome.tag} means:</h3>
          <p className="font-medium">{outcome.at_a_glance}</p>
          <p>{outcome.in_detail}</p>
        </div>
      </div>
    </div>
  );
};
