# **✈️ Air Travel Justification Tool**

An interactive, highly accessible React web application designed for the **EAUC**. This reflective tool helps academic professionals evaluate the necessity of flying to conferences by weighing professional benefits against environmental impact.

This repository is designed to be easily managed: non-technical staff can update all text and questions via a single configuration file, while developers have a clean, modern, and accessible React codebase to maintain.

## **📖 Table of Contents**

1. [About this tool](https://www.google.com/search?q=%23%E2%84%B9%EF%B8%8F-about-this-tool)
2. [For EAUC: Content Admin Guide](https://www.google.com/search?q=%231-for-eauc-content-admin-guide)
3. [For EAUC: Website Integration (iframe)](https://www.google.com/search?q=%232-for-eauc-website-integration-iframe)
4. [For STA: Developer Guide](https://www.google.com/search?q=%233-for-sta-developer-guide)

## **ℹ️ About this tool**

Flying is a carbon intensive form of travel: one long-haul flight emits as much carbon as many people do in one [year](https://www.theguardian.com/environment/ng-interactive/2019/jul/19/carbon-calculator-how-taking-one-flight-emits-as-much-as-many-people-do-in-a-year). With global annual passengers expected to [double](http://files.1010global.org/documents/Aviation_briefing_Jan2019_FINAL.pdf) in the next 20 years, emissions from air travel are only set to increase. In the further and higher education sector (FHE), air travel to attend conferences is pervasive and encouraged. However, the current trend of air travel cannot continue if we are to limit a global temperature increase to [1.5°C](https://www.ipcc.ch/sr15/) and strive toward a net zero carbon sector and society.

### **Purpose of this tool**

Decision [trees](https://tyndall.ac.uk/sites/default/files/travel-strategy-treeofdecisions2.png) allow one to assess whether or not to fly to a conference. The Air Travel Justification Tool provides support once you have reached the end of a decision tree, **by helping you determine the importance of attending a particular conference or event after you have established that there are no alternatives to flying (ie. you cannot take the train, present/learn remotely etc.)**

Please note:

- The tool does not ask you to completely eliminate flying, but rather to travel better and only attend the most beneficial business meetings and conferences.
- The tool recognises instances when you must attend a conference/meeting to which you must fly and instead asks you to be more conscious of non-essential flights.
- The tool recognises the importance of informal meetings and conversations that occur during conferences and meetings and understands the necessity of occasionally engaging in informal spaces provided by in-person conferences and meetings.

Decision-making and assessing the importance of an action can be difficult. Often, the particular issue at hand becomes unfocused or mental shortcuts may produce decisions that do not reflect the reality of the [situation](https://www.gov.scot/binaries/content/documents/govscot/publications/advice-and-guidance/2013/06/influencing-behaviours-moving-beyond-individual-user-guide-ism-tool/documents/00423436-pdf/00423436-pdf/govscot%3Adocument/00423436.pdf). Many approaches to behaviour [ignore](https://www.tandfonline.com/doi/full/10.1080/09537320802557350) change and decision-making rely on improving knowledge of a situation. This may the role social practices and interactions with physical and technical infrastructures play in our everyday lives.

Utilising ideas from the [ISM](https://www.gov.scot/binaries/content/documents/govscot/publications/advice-and-guidance/2013/06/influencing-behaviours-moving-beyond-individual-user-guide-ism-tool/documents/00423436-pdf/00423436-pdf/govscot%3Adocument/00423436.pdf) framework developed for the Scottish Government, the Air Travel Justification Tool considers the individual, social and material contexts that shape behaviour and decision-making, facilitating a clear focus in assessing the importance of attending an event/conference to which you must fly in order to participate.

The tool also facilitates self-reflection, supporting you to engage with your individual, social and material boundaries and evaluate your needs.

### **How to Use this Tool**

Firstly, please consider a conference/event/meeting to which you must fly.

The [Air Travel Justification Tool](https://eauc-travel-better.vercel.app) is comprised of five assessments based on individual, social and material contexts. Each assessment consists of statements with which you may agree or disagree or feel neutral toward depending on your circumstances. Responses are assigned a number. For some statements, the numbers assigned to responses may be higher due to perceived importance. Please choose neutral if you are unsure of your answer.

At the end of each assessment you may calculate your score based on your responses and the assigned numbers. Please read the results discussion guide, titled "Interpret your Score," to help you understand your personal importance of attending a conference to which you must fly.

Each assessment can be completed independently. It is not necessary to complete every assessment, although it is advised to complete all relevant assessments to better engage with and understand the situation at hand. Please note that rationale for attending a conference eg. networking, research and to share work, may overlap.

Additionally, the discussion guide will help you brainstorm alternative methods to network, conduct research and share knowledge on local, regional and international scales.

Hyperlinks to sources are embedded in the document, simply hover over a blue word.

### **Consider this**

Flights are often taken by an elite few: in the United Kingdom, 70% of flights are taken by 15% of the [population](http://afreeride.org/about/#fn:6). In academia, [research shows](https://www.sciencedirect.com/science/article/pii/S0959652619311862) that senior male academics travel the most while early-career researchers travel much less.

Additionally, at times, early-career academics and non-tenured faculty may feel [forced](https://www.tandfonline.com/doi/full/10.1080/00330124.2013.784954) to fly to conferences, despite their climate concerns, due to its normalisation in academia and link to [career progression](https://www.sciencedirect.com/science/article/pii/S0959652619311862) and perceptions of success.

To minimise emissions from air travel while improving diversity and equity in academia, it is imperative to consider your identity and influence in academia and to scrutinise goals and motivations in attending a conference to which you must fly. The self-reflective nature of the tool will facilitate this consideration.

**Disclaimer:** the purpose of the tool is not to provide a conclusive, scientific measurement of importance or a ready-made decision, but rather, to help you reflect on why you may or may not choose to participate in a conference or meeting to which you must fly.

Additionally, this tool does not intend to simplify the issue of flying in the higher and further education sector or suggest that academics, researchers and staff must completely eliminate flying. Rather, it asks you to rethink the idea that we can and must always fly and to normalise other ways of coordinating, collaborating, researching and being, as academics.

## **1\. For EAUC: Content Admin Guide**

The entire text of this tool—including the homepage introduction, all assessment questions, scoring weights, outcome summaries, and the "Share your results" link—is controlled by a single configuration file. **You do not need to know how to code to update the website text.**

### **How to update the website content:**

1. Log in to your GitHub account and navigate to this repository.
2. Go to the file located at: src/assets/assessments_config.json.
3. Click the **Pencil Icon** (✏️) in the top right corner to edit the file.
4. Carefully change the text inside the quotation marks " ".
   - **⚠️ CRITICAL:** Do not delete any commas ,, brackets \[ \], or curly braces { }. Doing so will break the application.
5. Scroll to the bottom and click the green **Commit changes...** button.
6. The live website will automatically rebuild and update within 3–5 minutes.

### **💡 Pro-Tip for Safe Editing**

To avoid accidental syntax errors, we highly recommend copying the text from GitHub and pasting it into a free visual editor like [JSON Editor Online](https://www.google.com/search?q=https://jsoneditoronline.org/). You can edit the text safely there, and then paste it back into GitHub before saving.

### **Updating the "Share your results" Link**

If you move the location of your Communications Toolkit (e.g., from Google Drive to a page on the EAUC website), you can update the destination link by changing the "share_url" value located under "results_page" at the very top of the configuration file.

## **2\. For EAUC: Website Integration (iframe)**

To display this tool on the main EAUC website, you simply need to embed it using an HTML iframe.

Copy and paste the following snippet into your webpage editor (ensure you are in "HTML", "Code", or "Text" mode, not "Visual" mode):

\<iframe  
 src="https://\[YOUR-GITHUB-USERNAME\].github.io/eauc_travel_better/"  
 width="100%"  
 height="850px"  
 style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"  
 title="EAUC Air Travel Justification Tool"  
 loading="lazy"\>  
\</iframe\>

- **Height adjustments:** You may adjust the height="850px" value to better fit your specific webpage layout.
- **Accessibility:** The title attribute is required for screen readers. Please do not remove it.

## **3\. For STA: Developer Guide**

Welcome to the codebase\! This is a Single Page Application (SPA) built with modern React patterns, focusing heavily on accessibility and maintainability.

### **Tech Stack Overview**

- **Framework:** React 18 \+ Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v7 (react-router)
- **PDF Generation:** html2pdf.js

### **Architectural Highlights**

- **Config-Driven UI:** The app is purely config-driven. All UI text, logic, questions, and scoring boundaries are dynamically mapped from src/assets/assessments_config.json. This decouples the business logic from the rendering engine.
- **State Management:** Context API \+ useReducer (ResultsContext.tsx). We avoided heavy external state libraries (like Redux) to keep the bundle lightweight. The state tracks multi-step form data across the router.
- **PDF Generation:** We use html2pdf.js to compile the DOM into a downloadable PDF for the user's final results. Note: The PDF generator uses document.querySelector to target the results section ID for compilation.

### **Accessibility (a11y) Standards**

This application strictly adheres to WCAG standards:

- **Forms:** Questions are grouped using \<fieldset\> and \<legend\> tags for optimal screen reader compatibility. Inputs utilize aria-required="true".
- **Focus Traps:** The Results Modal (ResultsModal.tsx) implements a strict custom Focus Trap. When the modal opens, focus is explicitly handled, the Tab key is trapped within the modal bounds to prevent background tabbing, and the Escape key closes the dialog.

### **Local Development Setup**

1. **Clone the repository:**  
   git clone \<repository-url\>  
   cd eauc_travel_better

2. **Install dependencies:**  
   npm install

3. **Start the development server:**  
   npm run dev

### **Deployment Strategy (GitHub Pages)**

This project is configured to be hosted on GitHub Pages.

**To test the production build locally:**

Do not open index.html directly (it will throw CORS errors due to ES modules). Instead, run:

npm run build  
npm run preview

**Deployment Configuration:**

Ensure the base property in vite.config.ts matches the repository name (e.g., base: '/eauc_travel_better/') before deploying to GitHub pages. The standard deployment flow involves pushing the dist folder to the gh-pages branch, which can be automated via GitHub Actions.
