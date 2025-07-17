router.get('/summary', async (req, res) => {
  try {
    const records = await Record.find();
    console.log("All Records:", records);

    let income = 0;
    let expense = 0;

    records.forEach((record) => {
      const amount = Number(record.amount); // ✅ make sure it's a number
      if (record.type === 'income') {
        income += amount;
      } else if (record.type === 'expense') {
        expense += amount;
      }
    });

    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
