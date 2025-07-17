const express = require('express');
const router = express.Router();
const {
  getRecords,
  createRecord,
  deleteRecord,
  updateRecord,
} = require('../controllers/recordController');
const Record = require('../models/recordModel'); 

router.get('/', getRecords);
router.post('/', createRecord);
router.delete('/:id', deleteRecord);
router.put('/:id', updateRecord);

// ✅ Add this summary route
router.get('/summary', async (req, res) => {
  try {
    const records = await Record.find();

    let income = 0;
    let expense = 0;

    records.forEach((record) => {
      if (record.type === 'income') {
        income += record.amount;
      } else if (record.type === 'expense') {
        expense += record.amount;
      }
    });

    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
