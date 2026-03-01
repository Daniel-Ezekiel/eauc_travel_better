import { useLocation } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import AssessmentsConfig from "../../assets/assessments_config.json";

interface questions {
  id: string;
  text: string;
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
          <form className="max-w-200 mx-auto grid gap-5">
            {assessmentCategory.questions.map((question) => (
              <fieldset key={question.id} className="form-control flex flex-col gap-2">
                <legend className="mb-2 w-full font-normal text-2xl">{question.id.slice(2)}. {question.text}</legend>
                <div className="flex gap-2 justify-start items-center">
                  <input type="radio" name={question.id} id={`${question.id}-disagree-choice`} value="disagree-0" />
                  <label htmlFor={`${question.id}-disagree-choice`}>Disagree</label>
                </div>
                 <div className="flex gap-2 justify-start items-center">
                  <input type="radio" name={question.id} id={`${question.id}-neutral-choice`} value="neutral-1" />
                  <label htmlFor={`${question.id}-neutral-choice`}>Neutral</label>
                </div>
                 <div className="flex gap-2 justify-start items-center">
                  <input type="radio" name={question.id} id={`${question.id}-agree-choice`} value="agree-2" />
                  <label htmlFor={`${question.id}-agree-choice`}>Agree</label>
                </div>
              </fieldset>
            ))}

            <button type="button" className="cursor-pointer">See Results</button>
          </form>
        </section>
      </MainLayout>
    </>
  );
};
