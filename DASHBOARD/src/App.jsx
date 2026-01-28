import React from "react";

const App = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>MyDashboard</h2>
        <p style={styles.menuItem}>🏠 Dashboard</p>
        <p style={styles.menuItem}>👤 Users</p>
        <p style={styles.menuItem}>📊 Analytics</p>
        <p style={styles.menuItem}>⚙ Settings</p>
      </div>

      {/* Main Section */}
      <div style={styles.main}>
        {/* Navbar */}
        <div style={styles.navbar}>
          <h2>Dashboard</h2>
          <div style={styles.profile}></div>
        </div>

        {/* Cards */}
        <div style={styles.cardRow}>
          <StatCard title="Users" value="1,240" />
          <StatCard title="Revenue" value="₹45,000" />
          <StatCard title="Orders" value="320" />
        </div>

        {/* Activity */}
        <div style={styles.activityBox}>
          <h3>Recent Activity</h3>
          <ul>
            <li>✅ New user registered</li>
            <li>💳 Payment received</li>
            <li>📦 Order shipped</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* Small Reusable Card */
const StatCard = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <p style={{ color: "#777" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
};

/* Inline Styles Object */
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

  logo: {
    marginBottom: "30px",
  },

  menuItem: {
    margin: "15px 0",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  navbar: {
    backgroundColor: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profile: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
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
