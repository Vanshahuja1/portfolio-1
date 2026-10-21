import { useEffect } from "react";

// Sets the document title (and optionally the meta description) for the
// current route, restoring the previous values when the route unmounts.
const usePageTitle = (title, description) => {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    const prevTitle = document.title;
    const prevDescription = meta?.getAttribute("content");

    document.title = title;
    if (description && meta) meta.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription) meta.setAttribute("content", prevDescription);
    };
  }, [title, description]);
};

export default usePageTitle;
