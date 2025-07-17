const Record = require('../models/record');

const getSummary = async (req, res) => {
  try {
    const records = await Record.find();
    const income = records
      .filter((r) => r.type === "income")
      .reduce((acc, cur) => acc + cur.amount, 0);
    const expense = records
      .filter((r) => r.type === "expense")
      .reduce((acc, cur) => acc + cur.amount, 0);
    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (error) {
    console.error("Error fetching summary:", error.message);
    res.status(500).json({ error: "Failed to calculate summary" });
  }
};

module.exports = { getSummary };

