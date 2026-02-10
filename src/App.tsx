import { BrowserRouter, Route, Routes } from "react-router-dom";
import MetaHandler from "./Components/handler/Metahandler";
import { flatRoutes } from "./config/routes";

function App() {
  return (
    <BrowserRouter>
      <MetaHandler />

      <Routes>
        {flatRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
