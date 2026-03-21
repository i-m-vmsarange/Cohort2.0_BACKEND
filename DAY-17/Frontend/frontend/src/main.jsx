import { createRoot } from "react-dom/client";
import Home from "./features/auth/pages/Home";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <App>
    <Home />
  </App>,
);
