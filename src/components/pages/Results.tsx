import html2pdf from "html2pdf.js";
import { MainLayout } from "../layout/MainLayout";
import { ResultCard } from "../ResultCard";
import { FaArrowDownLong } from "react-icons/fa6";

export const Results = ({ results }: { results: object }) => {
  const downloadResults = () => {
    const resultsSection = document.querySelector("#results-section") as HTMLElement;
    const options = {
      margin:       0.75,
      filename:     "Air_Travel_Justification_Assessment_Results.pdf",
      image:        { type: "jpeg" as const, quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "in", format: "letter", orientation: "portrait" as const }
    };

    html2pdf().from(resultsSection).set(options).save();

    // const resultsText = (
    //   document.querySelector("#results-section") as HTMLElement
    // )?.innerText;

    // const link = document.createElement("a");
    // const blob = new Blob([resultsText], { type: "text/plain" });
    // link.href = URL.createObjectURL(blob);
    // link.download = "assessment-results.txt";
    // link.click();
    // URL.revokeObjectURL(link.href);
  };

  return (
    <MainLayout>
      <section className="mt-4 py-4 flex flex-col items-center gap-4 text-center">
        <h1 className="font-medium text-4xl text-midnight sm:text-5xl">
          Interpret your scores
        </h1>
        <button
          type="button"
          onClick={downloadResults}
          className="mt-4 px-4 py-3 flex items-center gap-2 bg-midnight text-sandstone-tint rounded-2xl cursor-pointer hover:scale-105 transition-transform ease-in-out"
        >
          Download Results
          <FaArrowDownLong />
        </button>

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
