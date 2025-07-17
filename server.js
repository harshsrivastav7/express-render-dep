const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Record model
const Record = require('./models/recordModel');

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes

// Test route
app.get('/api/test', (req, res) => {
  res.send('API is working 🚀');
});

// Get all records
app.get('/api/records', async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

// Create a new record
app.post('/api/records', async (req, res) => {
  const newRecord = new Record(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
});

// Delete a record
app.delete('/api/records/:id', async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: 'Record deleted' });
});

// Update a record
app.put('/api/records/:id', async (req, res) => {
  const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ Summary route for StatsCard
app.get('/api/summary', async (req, res) => {
  try {
    const records = await Record.find();

    let income = 0;
    let expense = 0;

    records.forEach((record) => {
      if (record.type === "income") {
        income += record.amount;
      } else if (record.type === "expense") {
        expense += record.amount;
      }
    });

    res.json({ income, expense });
  } catch (err) {
    res.status(500).json({ error: "Error fetching summary data" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

