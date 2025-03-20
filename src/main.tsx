import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// SSR safety: Apply this fix before any other code runs
// This needs to happen before any component imports that might use useLayoutEffect
if (typeof window === "undefined" || typeof document === "undefined") {
  // Create a noop function for useLayoutEffect during SSR
  const noop = () => {};
  // @ts-ignore - Replace React's useLayoutEffect with useEffect for SSR
  React.useLayoutEffect = noop;
}

const basename = import.meta.env.BASE_URL;

// Only run client-side code if we're in the browser
if (typeof document !== "undefined" && document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
