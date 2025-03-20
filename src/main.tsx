import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Fix for useLayoutEffect warning in SSR
// This ensures the check works in all environments
if (typeof window === "undefined" || typeof document === "undefined") {
  // @ts-ignore
  React.useLayoutEffect = React.useEffect;
}

// Alternative approach that's more reliable for Vercel deployments
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
// Replace React's useLayoutEffect to make it safe for SSR
// @ts-ignore
React.useLayoutEffect = useIsomorphicLayoutEffect;

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
