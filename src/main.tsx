import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

// const appContent =
//   document.getElementById("appContent") ||
//   (() => {
//     const el = document.createElement("div");
//     el.id = "appContent";
//     document.body.appendChild(el);
//     return el;
//   })();
// createRoot(appContent).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

function ready(fn: () => void) {
  if (document.body) return fn();

  const observer = new MutationObserver(() => {
    if (document.body) {
      observer.disconnect();
      fn();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
  });
}

ready(() => {
  const appContent =
    document.getElementById("appContent") ||
    (() => {
      const el = document.createElement("div");
      el.id = "appContent";
      document.body.appendChild(el);
      return el;
    })();
  createRoot(appContent).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
