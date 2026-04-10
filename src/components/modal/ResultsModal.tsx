import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

export const ResultsModal = ({
  score,
  tag,
  summary,
  details,
  nextAssessmentId,
  handleClick,
}: {
  score: number;
  tag: string;
  summary: string;
  details: string;
  nextAssessmentId?: string;
  handleClick: () => void;
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Automatically focus the close button when the modal opens
    closeBtnRef.current?.focus();

    // 3. Create the Focus Trap & Escape Key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow closing with the Escape key (Major a11y requirement)
      if (e.key === "Escape") {
        handleClick();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;

        // Find all elements inside the modal that can be focused
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        // Trap focus: If holding Shift + Tab on the first element, jump to the last
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        }
        // Trap focus: If hitting Tab on the last element, jump back to the first
        else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup listener when modal closes
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-modal"
      className="fixed top-0 left-0 w-dvw h-dvh p-4 grid place-items-center bg-midnight/70 backdrop-blur-xs"
    >
      <div
        tabIndex={0}
        className="relative max-w-180 max-h-[68dvh] z-10 p-8 grid gap-2 bg-midnight rounded-[1.25rem] rounded-br-none text-sandstone-tint overflow-y-scroll"
      >
        <h2 className="text-4xl md:text-center">Interpret your score</h2>
        <p className="text-2xl">
          Score: <span>{score}</span>
        </p>
        <div className="grid gap-4">
          <h3>What a score between {tag} means:</h3>
          <p className="font-medium">{summary}</p>
          <p>{details}</p>
        </div>
      </div>
      {nextAssessmentId && (
        <Link
          to={`/${nextAssessmentId}`}
          type="button"
          className="btn_modal-close absolute max-w-56 flex gap-4 items-start top-10 right-10 z-10 cursor-pointer font-medium text-left text-sandstone-tint"
          onClick={handleClick}
          aria-label="Close Results Modal"
        >
          <FaTimesCircle size={48} className="h-fit pt-2" /> Close results and
          go to next assessment
        </Link>
      )}
      {!nextAssessmentId && (
        <Link
          to="/assessment_results"
          type="button"
          className="btn_modal-close absolute max-w-56 flex gap-4 items-start top-10 right-10 z-10 cursor-pointer font-medium text-left text-sandstone-tint"
          onClick={handleClick}
          aria-label="Close Results Modal"
        >
          <FaTimesCircle size={48} className="h-fit pt-2" /> Close results and
          view all assessment results
        </Link>
      )}
    </div>
  );
};
