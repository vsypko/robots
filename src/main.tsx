import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.tsx";
import { RobotProvider } from "./context/RobotContext.tsx";
import { MissionProvider } from "./context/MissionContext.tsx";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
)
  document.documentElement.classList.add("dark");
else document.documentElement.classList.remove("dark");
const root = document.getElementById("root");
root!.setAttribute("class", "bg-slate-200 dark:bg-slate-800");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RobotProvider>
      <MissionProvider>
        <App />
      </MissionProvider>
    </RobotProvider>
  </StrictMode>
);
