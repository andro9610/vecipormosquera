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

if (window.location.pathname.startsWith(basename) && window.location.pathname.length > basename.length + 1) {
  const normalizedPathname = window.location.pathname.replace(/\/$/, "");

  if (normalizedPathname !== window.location.pathname) {
    window.history.replaceState(null, "", `${normalizedPathname}${window.location.search}${window.location.hash}`);
  }
}

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
