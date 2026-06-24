import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ExpenseProvider } from "./context/ExpenseContext";

createRoot(document.getElementById("root")!).render(
  <ExpenseProvider>
    <App />
  </ExpenseProvider>,
);
