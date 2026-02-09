import React, { useState, useEffect, useCallback } from "react";

const API_BASE = "/api";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/dashboard`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const balance =
    dashboardData != null
      ? (dashboardData.totalIncome ?? 0) - (dashboardData.totalExpenses ?? 0)
      : null;

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Finance Tracker</h2>
        <p style={styles.menuItem}> Dashboard</p>
        <p style={styles.menuItem}> Users</p>
        <p style={styles.menuItem}> Analytics</p>
        <p style={styles.menuItem}> Settings</p>
      </div>

      {/* Main Section */}
      <div style={styles.main}>
        <div style={styles.navbar}>
          <h2>Dashboard</h2>
          <div style={styles.navRight}>
            {!loading && dashboardData && (
              <button style={styles.refreshBtn} onClick={fetchDashboard}>
                🔄 Refresh
              </button>
            )}
            <div style={styles.profile}></div>
          </div>
        </div>

        {loading && (
          <div style={styles.messageBox}>
            <p>Loading dashboard data...</p>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <p><strong>Error:</strong> {error}</p>
            <button style={styles.retryBtn} onClick={fetchDashboard}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && dashboardData && (
          <>
            <div style={styles.cardRow}>
              <StatCard
                title="Total Income"
                value={formatCurrency(dashboardData.totalIncome)}
                color="#22c55e"
              />
              <StatCard
                title="Total Expenses"
                value={formatCurrency(dashboardData.totalExpenses)}
                color="#ef4444"
              />
              <StatCard
                title="Balance"
                value={formatCurrency(balance)}
                color={balance >= 0 ? "#3b82f6" : "#f59e0b"}
              />
            </div>
            <div style={styles.activityBox}>
              <h3>Recent Activity</h3>
              <ul>
                <li> Dashboard data loaded from backend</li>
                <li> Summary: Income &amp; Expenses</li>
                <li> Balance = Income − Expenses</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div style={styles.card}>
    <p style={{ color: "#777" }}>{title}</p>
    <h2 style={{ color: color || "#111" }}>{value}</h2>
  </div>
);

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f2f4f8",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#111827",
    color: "white",
    padding: "20px",
  },
  logo: { marginBottom: "30px" },
  menuItem: { margin: "15px 0", cursor: "pointer" },
  main: { flex: 1, padding: "20px" },
  navbar: {
    backgroundColor: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navRight: { display: "flex", alignItems: "center", gap: "12px" },
  refreshBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "600",
  },
  profile: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
  },
  messageBox: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px",
    border: "1px solid #fecaca",
    color: "#b91c1c",
  },
  retryBtn: {
    marginTop: "12px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #b91c1c",
    backgroundColor: "white",
    color: "#b91c1c",
    cursor: "pointer",
  },
  cardRow: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  activityBox: {
    backgroundColor: "white",
    marginTop: "25px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default App;
