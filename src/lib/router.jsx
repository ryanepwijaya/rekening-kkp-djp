import { createContext, useContext, useEffect, useState } from "react";

// Router berbasis hash (#/giro/regulasi). Cocok untuk situs statis di Vercel
// dan aman untuk PWA offline: semua rute dilayani oleh index.html yang sama.

function parse(hash) {
  const raw = (hash || "").replace(/^#\/?/, "");
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = pathPart.replace(/\/+$/, "");
  const query = Object.fromEntries(new URLSearchParams(queryPart));
  return { path, parts: path ? path.split("/") : [], query };
}

const RouteContext = createContext(parse(""));

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      setRoute((prev) => {
        if (prev.path !== next.path) {
          window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
        }
        return next;
      });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}

export function useRoute() {
  return useContext(RouteContext);
}

export function href(to) {
  return `#/${to || ""}`;
}

export function navigate(to) {
  window.location.hash = `/${to || ""}`;
}

export function Link({ to, children, ...rest }) {
  return (
    <a href={href(to)} {...rest}>
      {children}
    </a>
  );
}
