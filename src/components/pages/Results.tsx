import assessmentsData from "../../assets/assessments_config.json";
import { Link } from "react-router";
import html2pdf from "html2pdf.js";
import { MainLayout } from "../layout/MainLayout";
import { ResultCard } from "../ResultCard";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuShare } from "react-icons/lu";

export const Results = ({ results }: { results: object }) => {
  const { results_page } = assessmentsData;

  const downloadResults = () => {
    const resultsSection = document.querySelector(
      "#results-section",
    ) as HTMLElement;
    const options = {
      margin: 0.75,
      filename: "Air_Travel_Justification_Assessment_Results.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const },
    };

    html2pdf().from(resultsSection).set(options).save();
  };

  return (
    <MainLayout>
      <section className="mt-4 py-4 flex flex-col items-center gap-4 text-center">
        <h1 className="font-medium text-4xl text-midnight sm:text-5xl">
          {results_page["title"]}
        </h1>
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={downloadResults}
            className="mt-4 px-4 py-3 flex items-center gap-2 bg-midnight text-sandstone-tint rounded-2xl cursor-pointer hover:scale-105 transition-transform ease-in-out"
          >
            {results_page["download_button_text"]}
            <FaArrowDownLong />
          </button>
          <Link
            to={results_page["share_url"]}
            target="_blank"
            className="mt-4 px-4 py-3 flex items-center gap-2 border-midnight border-2 bg-sandstone text-midnight font-medium rounded-2xl cursor-pointer hover:scale-105 transition-transform ease-in-out"
          >
            {results_page["share_button_text"]}
            <LuShare />
          </Link>
        </div>

        <div className="max-w-lg w-full h-0.5 my-4 bg-lagoon rounded-full">
          &nbsp;
        </div>
      </section>
      <section
        id="results-section"
        className="max-w-200 mt-4 mx-auto grid gap-8 place-items-stretch"
      >
        {Object.entries(results).map((entry) => (
          <ResultCard key={entry[0]} result={entry[1]} />
        ))}
      </section>
    </MainLayout>
  );
};
