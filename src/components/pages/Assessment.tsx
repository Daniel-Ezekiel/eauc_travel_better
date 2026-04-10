import { Link, useLocation } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import AssessmentsConfig from "../../assets/assessments_config.json";
import { useState } from "react";
import { ResultsModal } from "../modal/ResultsModal";
import type { Results, ResultCategory, UpdateResultsPayload } from "../../App";

interface Questions {
  id: string;
  text: string;
  scores: {
    disagree: number;
    neutral: number;
    agree: number;
  };
}

export interface Outcome {
  min_score: number;
  max_score: number;
  tag: string;
  at_a_glance: string;
  in_detail: string;
}

interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  questions: Questions[];
  outcomes: Outcome[];
}

export const Assessment = ({
  results,
  onUpdateResults,
}: {
  results: Results;
  onUpdateResults: (data: UpdateResultsPayload) => void;
}) => {
  const { pathname } = useLocation();
  const currPageId = pathname.slice(1);

  const isAllResultsAvailable = Object.values(results).every(
    (result) => Object.keys(result).length > 0,
  );
  const isResultsAvailable =
    Object.values(results[currPageId as keyof Results]).length !== 0;
  const currPageResults =
    isResultsAvailable && results[currPageId as keyof Results];

  const [assessmentScore, setAssessmentScore] = useState<number>(0);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<undefined | Outcome>(undefined);

  const [assessmentCategory]: AssessmentCategory[] =
    AssessmentsConfig.data.filter((assessment) => assessment.id === currPageId);

  const currPageIdIndex: number = AssessmentsConfig.data.findIndex(
    (assessment) => assessment.id === currPageId,
  );
  const nextAssessmentId: string | undefined =
    AssessmentsConfig.data[currPageIdIndex + 1]?.id;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>): void {
    const data = new FormData(e.currentTarget);

    const allResponses = [];

    for (const [questionId, score] of data) {
      const response = {
        questionId,
        questionText: assessmentCategory.questions.find(
          (question) => question.id === questionId,
        )?.text,
        questionScore: +score,
      };
      allResponses.push(response);
    }

    const results = {
      page: currPageId,
      allResponses,
      totalScore: allResponses.reduce((acc, c) => acc + c.questionScore, 0),
    };
    setAssessmentScore(results.totalScore);

    const validOutcome = assessmentCategory.outcomes.find(
      (outcome) =>
        results.totalScore >= outcome.min_score &&
        results.totalScore <= outcome.max_score,
    );
    setOutcome(validOutcome);
    setToggleModal(true);
    document.querySelector("body")?.classList.add("modal-active");

    onUpdateResults({
      page: results.page,
      title: assessmentCategory.title,
      responses: results.allResponses,
      totalScore: results.totalScore,
      outcome: validOutcome,
    });

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
          <p className="font-medium">Choose one answer for each question.</p>

          <div className="max-w-lg w-full h-0.5 my-4 bg-lagoon rounded-full">
            &nbsp;
          </div>
        </section>
        <section>
          <form
            className="max-w-200 mx-auto grid gap-5"
            onSubmit={handleSubmit}
          >
            {assessmentCategory.questions.map((question) => {
              const currPageResponses = (currPageResults &&
                (currPageResults as ResultCategory).responses) as unknown as {
                questionId: string;
                questionScore: number;
              }[];
              const currQuestion =
                currPageResults &&
                currPageResponses.find((res) => res.questionId === question.id);

              return (
                <fieldset
                  key={question.id}
                  className="form-control flex flex-col gap-2"
                >
                  <legend className="mb-2 w-full font-normal text-2xl">
                    {question.id.slice(2)}. {question.text}
                  </legend>

                  <div className="flex gap-2 justify-start items-center">
                    <input
                      type="radio"
                      name={question.id}
                      id={`${question.id}-disagree-choice`}
                      value={question.scores.disagree}
                      defaultChecked={
                        currQuestion &&
                        currQuestion.questionScore === question.scores.disagree
                      }
                      aria-required="true"
                      required
                    />
                    <label htmlFor={`${question.id}-disagree-choice`}>
                      Disagree
                    </label>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <input
                      type="radio"
                      name={question.id}
                      id={`${question.id}-neutral-choice`}
                      value={question.scores.neutral}
                      defaultChecked={
                        currQuestion &&
                        currQuestion.questionScore === question.scores.neutral
                      }
                      aria-required="true"
                      required
                    />
                    <label htmlFor={`${question.id}-neutral-choice`}>
                      Neutral
                    </label>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <input
                      type="radio"
                      name={question.id}
                      id={`${question.id}-agree-choice`}
                      value={question.scores.agree}
                      defaultChecked={
                        currQuestion &&
                        currQuestion.questionScore === question.scores.agree
                      }
                      aria-required="true"
                      required
                    />
                    <label htmlFor={`${question.id}-agree-choice`}>Agree</label>
                  </div>
                </fieldset>
              );
            })}

            <div className="flex justify-between">
              <button
                type="submit"
                className="cursor-pointer py-2 px-5 bg-midnight text-sandstone-tint rounded-l-full"
              >
                See Results
              </button>

              {nextAssessmentId && isResultsAvailable && (
                <Link
                  to={`/${nextAssessmentId}`}
                  className="btn_modal-close cursor-pointer py-2 px-5 bg-midnight text-sandstone-tint rounded-r-full"
                >
                  Next Assessment
                </Link>
              )}

              {isAllResultsAvailable && nextAssessmentId === undefined && (
                <Link
                  to={`/assessment_results`}
                  className="cursor-pointer py-2 px-5 bg-midnight text-sandstone-tint rounded-r-full"
                >
                  View All Results
                </Link>
              )}
            </div>
          </form>
        </section>
        {toggleModal && (
          <ResultsModal
            score={assessmentScore}
            tag={(outcome as Outcome).tag}
            summary={(outcome as Outcome).at_a_glance}
            details={(outcome as Outcome).in_detail}
            nextAssessmentId={nextAssessmentId}
            handleClick={() => {
              setToggleModal(false);
              document
                .querySelector(".modal-active")
                ?.classList.remove("modal-active");
            }}
          />
        )}
      </MainLayout>
    </>
  );
};
