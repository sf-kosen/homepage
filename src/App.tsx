import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Join from "./Pages/Join";
import LT1 from "./Pages/LT1";
import LT1Register from "./Pages/LT1Register";
import VotePresenter from "./Pages/VotePresenter";

import ScrollToTop from "./Components/layout/ScrollToTop";

import ComingSoon from "./Pages/ComingSoon";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/join" element={<Join />} />
        <Route path="/events/lt-1" element={<LT1 />} />
        <Route path="/events/lt-1/register" element={<LT1Register />} />
        <Route path="/events/lt-1/vote/presenter" element={<VotePresenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
