import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import TitleHeader from "../components/TitleHeader";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page not found — Vansh Ahuja");

  return (
    <section className="section-padding pb-24 min-h-[60vh] flex flex-col items-center">
      <TitleHeader as="h1" title="Page Not Found" sub="404" />
      <p className="text-white-50 md:text-xl mt-8 text-center max-w-xl">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium whitespace-nowrap"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </section>
  );
};

export default NotFound;
