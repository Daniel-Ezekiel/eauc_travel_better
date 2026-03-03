import { Link, useLocation } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import AssessmentsConfig from "../../assets/assessments_config.json";

interface questions {
  id: string;
  text: string;
  scores: {
    disagree: number;
    neutral: number,
    agree: number,
  }
}

interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  questions: questions[];
}

export const Assessment = () => {
  const { pathname } = useLocation();
  const currPageId = pathname.slice(1);

  const [assessmentCategory]: AssessmentCategory[] =
    AssessmentsConfig.data.filter((assessment) => assessment.id === currPageId);

  const currPageIdIndex: number = AssessmentsConfig.data.findIndex(assessment => assessment.id === currPageId)
  const nextAssessmentId: string | undefined = AssessmentsConfig.data[currPageIdIndex + 1]?.id

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    const data = new FormData(e.currentTarget);
    let output = "";
    for (const entry of data) {
      output = `${output}${entry[0]}=${entry[1]},\r`;
    }
    console.log(output);
    e.preventDefault();
  }

  return (
    <>
      <MainLayout>
        <section className="mt-4 py-4 flex flex-col items-center gap-4 text-center">
          <h1 className="font-medium text-4xl text-midnight sm:text-5xl">
            {assessmentCategory.title}
          </h1>
          <p className="max-w-3xl">{assessmentCategory.description}</p>

          <div className="max-w-lg w-full h-0.5 my-4 bg-lagoon rounded-full">
            &nbsp;
          </div>
        </section>
        <section>
          <form className="max-w-200 mx-auto grid gap-5" onSubmit={handleSubmit}>
            {assessmentCategory.questions.map((question) => (
              <fieldset key={question.id} className="form-control flex flex-col gap-2">
                <legend className="mb-2 w-full font-normal text-2xl">{question.id.slice(2)}. {question.text}</legend>

                <div className="flex gap-2 justify-start items-center">
                  <input type="radio" name={question.id} id={`${question.id}-disagree-choice`} value={question.scores.disagree} required />
                  <label htmlFor={`${question.id}-disagree-choice`}>Disagree</label>
                </div>
                 <div className="flex gap-2 justify-start items-center">
                  <input type="radio" name={question.id} id={`${question.id}-neutral-choice`} value={question.scores.neutral} />
                  <label htmlFor={`${question.id}-neutral-choice`}>Neutral</label>
                </div>
                 <div className="flex gap-2 justify-start items-center">
                  <input type="radio" name={question.id} id={`${question.id}-agree-choice`} value={question.scores.agree} />
                  <label htmlFor={`${question.id}-agree-choice`}>Agree</label>
                </div>
              </fieldset>
            ))}

            <div className="flex justify-between">
              <button type="submit" className="cursor-pointer py-2 px-5 bg-midnight text-sandstone-tint rounded-l-full">See Results</button>
              {nextAssessmentId && <Link to={`/${nextAssessmentId}`} className="cursor-pointer py-2 px-5 bg-midnight text-sandstone-tint rounded-r-full">Next Assessment</Link>}
            </div>
          </form>
        </section>
      </MainLayout>
    </>
  );
};
