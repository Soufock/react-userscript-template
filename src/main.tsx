import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

const appContent = document.createElement("div");
appContent.id = "appContent";

// 插入到你指定的容器
const target = document.body;
target.appendChild(appContent);

createRoot(appContent).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
