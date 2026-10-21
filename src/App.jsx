import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

const App = () => (
  <BrowserRouter>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black"
    >
      Skip to main content
    </a>
    <Navbar />
    <ScrollToTop />
    <main id="main" tabIndex={-1} className="outline-none">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
