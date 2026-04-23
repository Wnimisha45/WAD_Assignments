const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DB_FILE = path.join(__dirname, "expenses.json");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.static(path.join(__dirname, "public")));

function readExpenses() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
  }

  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch (_error) {
    return [];
  }
}

function saveExpenses(expenses) {
  fs.writeFileSync(DB_FILE, JSON.stringify(expenses, null, 2));
}

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, status: "healthy" });
});

app.get("/api/expenses", (_req, res) => {
  const expenses = readExpenses();
  res.status(200).json({ success: true, data: expenses });
});

app.post("/api/expenses", (req, res) => {
  const { title, amount, category, spentOn } = req.body;

  if (!title || !amount || !category || !spentOn) {
    return res.status(400).json({
      success: false,
      message: "title, amount, category and spentOn are required",
    });
  }

  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "amount must be a positive number",
    });
  }

  const expenses = readExpenses();
  const newExpense = {
    id: Date.now().toString(),
    title: String(title).trim(),
    amount: parsedAmount,
    category: String(category).trim(),
    spentOn: String(spentOn),
    createdAt: new Date().toISOString(),
  };

  expenses.unshift(newExpense);
  saveExpenses(expenses);

  return res.status(201).json({
    success: true,
    message: "Expense added",
    data: newExpense,
  });
});

app.delete("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const next = expenses.filter((item) => item.id !== req.params.id);

  if (next.length === expenses.length) {
    return res.status(404).json({ success: false, message: "Expense not found" });
  }

  saveExpenses(next);
  return res.status(200).json({ success: true, message: "Expense deleted" });
});

app.get("/api/summary", (_req, res) => {
  const expenses = readExpenses();

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const byCategory = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    data: {
      count: expenses.length,
      totalSpent: Number(total.toFixed(2)),
      byCategory,
    },
  });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Expense Tracker running on port ${PORT}`);
});
