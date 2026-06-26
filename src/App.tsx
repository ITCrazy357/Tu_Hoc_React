import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <div className="container">
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
