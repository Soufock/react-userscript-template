import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

const appContent = document.getElementById("appContent") || (() => {
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
