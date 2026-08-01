import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./styles.css";
import "flyonui/flyonui";
import "material-symbols";

document.documentElement.setAttribute("data-theme", "light");
document.documentElement.style.colorScheme = "light";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

if (window.location.pathname === `${basename}/`) {
  window.history.replaceState(null, "", `${basename}${window.location.search}${window.location.hash}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
