import { Dashboard } from "../components/Dashboard";
import ExpenseChart from "../components/ExpenseChart";
import { useExpenses } from "../hooks/useExpenses";

function DashboardPage() {
  const { expenses } = useExpenses();

  if (expenses.length === 0) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Chưa có dữ liệu chi tiêu để hiển thị. Hãy thêm một khoản chi mới!</p>
      </div>
    );
  }

  return (
    <>
      <Dashboard expenses={expenses} />
      <ExpenseChart expenses={expenses} />
    </>
  );
}

export default DashboardPage;
