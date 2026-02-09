const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


app.get("/api/dashboard", (req, res) => {
  res.json({
    totalIncome: 125000,
    totalExpenses: 78200,
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
  console.log(`Dashboard endpoint: GET http://localhost:${PORT}/api/dashboard`);
});
