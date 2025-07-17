const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true } // ✅ enforce number
});

module.exports = mongoose.model("Record", recordSchema);

