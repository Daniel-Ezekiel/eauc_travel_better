import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ScrollToTop } from "./components/helpers/ScrollToTop";
import { Home } from "./components/pages/Home";
import { Assessment } from "./components/pages/Assessment";

function App() {

  return (
   <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/individual_context" element={<Assessment />} />
        <Route path="/social_context_networking" element={<Assessment />} />
        <Route path="/social_context_learning" element={<Assessment />} />
        <Route path="/social_context_presenting" element={<Assessment />} />
        <Route path="/material_context" element={<Assessment />} />
      </Routes>
    </Router>
  );
}

export default App;
