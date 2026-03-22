import { MainLayout } from "../layout/MainLayout";
import { ResultCard } from "../ResultCard";

export const Results = ({ results }: { results: object }) => {
    console.log(results)
  return (
    <MainLayout>
      <section className="mt-4 py-4 flex flex-col items-center gap-4 text-center">
        <h1 className="font-medium text-4xl text-midnight sm:text-5xl">
          Interpret your scores
        </h1>
        {/* <p className="max-w-3xl"></p> */}

        <div className="max-w-lg w-full h-0.5 my-4 bg-lagoon rounded-full">
          &nbsp;
        </div>
      </section>
      <section className="max-w-200 mt-4 mx-auto grid gap-8 place-items-stretch">
        {Object.entries(results).map((entry) => (
          <ResultCard
            key={entry[0]}
            result={entry[1]}
          />
        ))}
      </section>
    </MainLayout>
  );
};
