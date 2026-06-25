import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ExpenseProvider } from "./context/ExpenseContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </BrowserRouter>,
);
