import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import Spinner from "./Components/Spinner";
const NotFoundPage = lazy(() => import("./Pages/Not_found_page"));
const LandingPage = lazy(() => import("./Pages/Landing_page"));
const SinglePage = lazy(() => import("./Pages/Single_page"));
//use dynamic imports for the pages
type Data = {
  category: string;
  background: string;
};

function App() {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const [data, setData] = useState<Data>({
    category: "All",
    background: "#cfb995",
  });

  return (
    <Suspense fallback={<Spinner toggle={true} />}>
      <Provider store={store}>
        <Toaster position={isMobile ? "top-center" : "top-right"} />
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LandingPage setData={setData} data={data} />}
            />
            <Route
              path="/:id/:index/:category"
              element={<SinglePage setData={setData} data={data} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>
    </Suspense>
  );
}

export default App;
