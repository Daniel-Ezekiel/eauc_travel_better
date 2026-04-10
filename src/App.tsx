import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/helpers/ScrollToTop";
import { Home } from "./components/pages/Home";
import { Assessment, type Outcome } from "./components/pages/Assessment";
import { useReducer } from "react";
import {
  ResultsContext,
  ResultsDispatchContext,
} from "./contexts/ResultsContext";
import { Results } from "./components/pages/Results";

const initialResults = {
  individual_context: {},
  social_context_networking: {},
  social_context_learning: {},
  social_context_presenting: {},
  material_context: {},
};

// const initialResults = {
//   individual_context: {
//     assessment_title: "Assessment 1: Individual Context",
//     responses: [
//       {
//         questionId: "1.1",
//         questionText:
//           "I believe social media is a useful tool for disseminating ideas and/or research",
//         questionScore: 2,
//       },
//       {
//         questionId: "1.2",
//         questionText:
//           "I possess skills to disseminate these specific ideas and/or research through social media or other online or more local platforms",
//         questionScore: 2,
//       },
//       {
//         questionId: "1.3",
//         questionText:
//           "I possess skills to promote these specific ideas and/or research through social media or other online or more local platforms",
//         questionScore: 2,
//       },
//       {
//         questionId: "1.4",
//         questionText:
//           "I possess skills to learn about specific ideas and/or research that will be discussed at the conference through social media or other online or more local platforms",
//         questionScore: 2,
//       },
//       {
//         questionId: "1.5",
//         questionText:
//           "I possess skills to coordinate, collaborate and network with academics/researchers on these specific ideas and/or research through social media or other online or more local platforms",
//         questionScore: 2,
//       },
//       {
//         questionId: "1.6",
//         questionText:
//           "It would be helpful to use the time spent travelling and attending the conference to instead conduct research/continue work, which may improve my findings and its impact on my career",
//         questionScore: 2,
//       },
//     ],
//     totalScore: 12,
//     outcome: {
//       min_score: 8,
//       max_score: 12,
//       tag: "8-12",
//       at_a_glance:
//         "Your skills may provide you with opportunities to collaborate, learn and promote and share your work without flying to a conference.",
//       in_detail:
//         "While attending some conferences is still crucial to academic progression, reflecting on and acknowledging your skills may allow you to make better decisions about participating in conferences to which you must fly, by considering alternatives or supplements to conference attendance. Utilising your social media skills can reduce the number of conferences you may need to attend. Focusing on the actual purpose of attending these events and whether these purposes can be delivered through your online skills can uncover new modes of participating in academia.",
//     },
//   },
//   social_context_networking: {
//     assessment_title: "Assessment 2: Social Context (Networking)",
//     responses: [
//       {
//         questionId: "2.1",
//         questionText: "I am an early-career academic/researcher",
//         questionScore: 4,
//       },
//       {
//         questionId: "2.2",
//         questionText:
//           "At the conference, I will meet academics/researchers I have not met before",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.3",
//         questionText:
//           "At the conference, I will meet academics/researchers I have not met in person in over 1 year",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.4",
//         questionText:
//           "At the conference, I will meet academics/researchers with whom I cannot connect virtually",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.5",
//         questionText:
//           "At the conference, I will meet academics/researchers I cannot meet locally",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.6",
//         questionText:
//           "I will get an appropriate opportunity to chat with these particular academics/researchers (eg. enough time, one on one interactions, comfortable environment etc.)",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.7",
//         questionText:
//           "I am the only academic representing my department/research team at the conference",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.8",
//         questionText:
//           "I cannot ask early-career academics/researchers to attend this conference in my place to provide them with new opportunities (disagree if you are an early-career academic)",
//         questionScore: 2,
//       },
//       {
//         questionId: "2.9",
//         questionText:
//           "If I do not attend this conference in order to avoid flying, my actions may encourage others to avoid flying as well",
//         questionScore: 2,
//       },
//     ],
//     totalScore: 20,
//     outcome: {
//       min_score: 14,
//       max_score: 20,
//       tag: "14-20",
//       at_a_glance:
//         "It seems it may be quite important for you to attend this conference to strengthen professional relationships.",
//       in_detail:
//         "It may be useful to plan ahead: how can you make the most of this interaction? What questions would you like to ask and how can you access additional contacts through this meeting? You can also plan how you may continue the professional relationship without regular air travel. It may be beneficial to mention your plan and why you are hoping to reduce air travel to your new contact. Asking how they feel about your plan to reduce air travel may allow you to coordinate future meetings in more sustainable ways.",
//     },
//   },
//   social_context_learning: {
//     assessment_title: "Assessment 3: Social Context (Learning)",
//     responses: [
//       {
//         questionId: "3.1",
//         questionText: "I am an early-career academic/researcher",
//         questionScore: 4,
//       },
//       {
//         questionId: "3.2",
//         questionText:
//           "At the conference, I will learn about ideas that I have not been exposed to before",
//         questionScore: 2,
//       },
//       {
//         questionId: "3.3",
//         questionText:
//           "There will be an appropriate platform for me to learn (consider how best you learn and what is most comfortable for you)",
//         questionScore: 2,
//       },
//       {
//         questionId: "3.4",
//         questionText:
//           "These ideas are relevant and important to my current research/work",
//         questionScore: 2,
//       },
//       {
//         questionId: "3.5",
//         questionText:
//           "At the conference, I will learn from a researcher/academic who I cannot learn from virtually or locally at another conference",
//         questionScore: 2,
//       },
//       {
//         questionId: "3.6",
//         questionText:
//           "The conference offers technical training/certification important to my career that I cannot do virtually/locally",
//         questionScore: 2,
//       },
//       {
//         questionId: "3.7",
//         questionText:
//           "I am the only academic from my department/research team/project attending the conference",
//         questionScore: 2,
//       },
//       {
//         questionId: "3.8",
//         questionText:
//           "I cannot ask early-career academics/researchers to attend this conference in my place to provide them with new opportunities (disagree if you are an early-career academic)",
//         questionScore: 2,
//       },
//     ],
//     totalScore: 18,
//     outcome: {
//       min_score: 13,
//       max_score: 18,
//       tag: "13-18",
//       at_a_glance:
//         "It looks like attending this conference may benefit your research.",
//       in_detail:
//         "Plan ahead to make sure you make the most out of your trip. What questions are you hoping to have answered? How else will you find answers if they are not addressed at the conference? How will you continue research after this experience? How will you keep in touch with whomever provided you with new information? Considering these questions before attending the conference may give you more time and space to avoid attending a conference to which you must fly in the future.",
//     },
//   },
//   social_context_presenting: {
//     assessment_title: "Assessment 4: Social Context (Presenting)",
//     responses: [
//       {
//         questionId: "4.1",
//         questionText: "I am an early-career academic/researcher",
//         questionScore: 4,
//       },
//       {
//         questionId: "4.2",
//         questionText:
//           "At the conference, I will be presenting research I have not shared before",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.3",
//         questionText:
//           "I am presenting research I cannot share locally/virtually at another conference",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.4",
//         questionText:
//           "I am confident that my work is ready to share, or if my work is unfinished, I am confident it is ready for feedback",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.5",
//         questionText:
//           "At the conference, I will be given an appropriate platform to share my research/ideas (eg. enough speaking time, proper technology, relevant audience)",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.6",
//         questionText:
//           "Sharing my research through this platform will enhance my academic reputation or increase my likelihood of getting published",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.7",
//         questionText:
//           "Attending the conference despite flying will not hinder the credibility of my research (eg. work on climate change, social justice etc.)",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.8",
//         questionText:
//           "I cannot ask early-career academics/researchers to attend this conference in my place to provide them with new opportunities (disagree if you are an early-career academic)",
//         questionScore: 2,
//       },
//       {
//         questionId: "4.9",
//         questionText:
//           "I am the only academic from my department/research team attending the conference to share ideas/research",
//         questionScore: 2,
//       },
//     ],
//     totalScore: 20,
//     outcome: {
//       min_score: 14,
//       max_score: 20,
//       tag: "14-20",
//       at_a_glance:
//         "It may be important, and an appropriate time/platform to share/present your ideas.",
//       in_detail:
//         "At this conference, try and plan ahead so that you make the biggest impact with your presentation. If you are interested in reducing your flying, inform your audience of this goal, perhaps they will support your goal and collaborate with you, or seek out your research through alternative means, contributing to a shift in academic norms. Think about what elements of your work you would like to present, and why. What are the next steps for your research and how can this presentation support those steps?",
//     },
//   },
//   material_context: {
//     assessment_title: "Assessment 5: Material Context",
//     responses: [
//       {
//         questionId: "5.1",
//         questionText:
//           "Attending this conference would fulfil certain grant requirements",
//         questionScore: 2,
//       },
//       {
//         questionId: "5.2",
//         questionText:
//           "I risk losing my grant/funding if I do not attend this particular event/conference",
//         questionScore: 4,
//       },
//       {
//         questionId: "5.3",
//         questionText: "I rely strongly on this particular grant",
//         questionScore: 4,
//       },
//       {
//         questionId: "5.4",
//         questionText:
//           "There are no local or virtual events/conferences that could instead fulfil my grant requirements",
//         questionScore: 2,
//       },
//       {
//         questionId: "5.5",
//         questionText:
//           "Online platforms or other fora are not appropriate for disseminating my research/ideas (eg. not interactive enough, not enough traction)",
//         questionScore: 2,
//       },
//       {
//         questionId: "5.6",
//         questionText:
//           "This is the only non-local conference/event I can attend all year (eg. due to teaching obligations, familial obligations, lack of funding etc.)",
//         questionScore: 2,
//       },
//       {
//         questionId: "5.7",
//         questionText:
//           "I am able to visit friends/family, attend other conferences/professional meetings or conduct research due to the location of the conference",
//         questionScore: 2,
//       },
//     ],
//     totalScore: 18,
//     outcome: {
//       min_score: 13,
//       max_score: 18,
//       tag: "13-18",
//       at_a_glance:
//         "It seems that material considerations, like technology, regulations and scheduling make it important for you to attend the conference.",
//       in_detail:
//         "Although it is often out of our scope to alter our material realities, in the future, if possible, early planning may prevent schedule hindrances or allow you to make the most out of the trip by visiting family/friends, planning meetings or conducting research at the conference location. Additionally, awareness of grant stipulations may offer you some bargaining power, the ability to discuss grants beforehand or if possible, the ability to choose different grants, although this may be difficult for many.",
//     },
//   },
// };

export interface AssessmentPage {
  assessment_id: string;
  assessment_results: Record<string, unknown>;
}

interface ResultResponse {
  questionId: string;
  questionText: string;
  questionScore: number;
}

export interface ResultCategory {
  assessment_title: string;
  totalScore: number;
  outcome: Outcome;
  responses: ResultResponse[];
}

export interface Results {
  individual_context: ResultCategory | {};
  social_context_networking: ResultCategory | {};
  social_context_learning: ResultCategory | {};
  social_context_presenting: ResultCategory | {};
  material_context: ResultCategory | {};
}

export interface AssessmentResults {
  assessment_title: string;
  responses: unknown;
  totalScore: number;
  outcome: Outcome;
}

export interface UpdateResultsPayload {
  page: string;
  title: string;
  responses: unknown;
  totalScore: number;
  outcome: unknown;
}

const resultsReducer = (results: Results, page: AssessmentPage): Results => {
  return {
    ...results,
    [page.assessment_id]: page.assessment_results,
  };
};

function App() {
  const [results, dispatch] = useReducer(resultsReducer, initialResults);

  const handleUpdateResults = (results: UpdateResultsPayload): void => {
    dispatch({
      assessment_id: results.page,
      assessment_results: {
        assessment_title: results.title,
        responses: results.responses,
        totalScore: results.totalScore,
        outcome: results.outcome,
      },
    });
  };

  return (
    <ResultsContext value={results}>
      <ResultsDispatchContext value={dispatch}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home results={results} />} />
            <Route
              path="/assessment_results"
              element={<Results results={results} />}
            />
            <Route
              path="/individual_context"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/social_context_networking"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/social_context_learning"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/social_context_presenting"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/material_context"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
          </Routes>
        </Router>
      </ResultsDispatchContext>
    </ResultsContext>
  );
}

export default App;
