import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img src="/favicon.svg" alt="Expense Tracker" />
          <h1>Expense Tracker</h1>
        </NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/expenses">Expenses</NavLink>
          </li>
          <li>
            <NavLink to="/report">Report</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
