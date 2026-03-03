import { FaTimesCircle } from "react-icons/fa";

export const ResultsModal = ({
  score,
  tag,
  summary,
  details,
  handleClick,
}: {
  score: number;
  tag: string;
  summary: string;
  details: string;
  handleClick: () => void
}) => {
  return (
    <div className="fixed top-0 left-0 w-dvw h-dvh p-4 grid place-items-center bg-midnight/70 backdrop-blur-xs">
      <div className="relative max-w-180 max-h-[68dvh] z-10 p-8 grid gap-2 bg-midnight rounded-[1.25rem] rounded-br-none text-sandstone-tint overflow-y-scroll">
        <h2 className="text-4xl text-center">Interpret your score</h2>
        <p className="text-2xl">Score:  <span>{score}</span></p>
        <div className="grid gap-4">
            <h3>What a score between {tag} means:</h3>
            <p className="font-medium">{summary}</p>
            <p>{details}</p>
        </div>
      </div>
      <button type="button" className="absolute flex gap-2 items-center top-10 right-10 z-10 cursor-pointer font-medium text-sandstone-tint" onClick={handleClick}>
        <FaTimesCircle /> Close Results
      </button>
    </div>
  );
};
