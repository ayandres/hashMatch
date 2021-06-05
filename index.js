const bcrypt = require('bcrypt');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const saltRounds = 10;
const plainText = 'ReskillAmericans123';
const hashHasPassed = bcrypt.hashSync(plainText, saltRounds);

app.use(express.json());

app.post('/pass', async (req, res) => {
  try {
    const { pass } = req.body;

    if (!pass)
      return res.status(400).json({ message: 'Please provide password' });

    const comparisonMatch = await bcrypt.compare(pass, hashHasPassed);

    res.status(200).json({
      status: 'success',
      data: {
        results: comparisonMatch,
      },
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});