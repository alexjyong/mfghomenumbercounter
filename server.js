const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
// app.use(express.static('public'));  // commenting out this line for now

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/next-number', (req, res) => {
  fs.readFile('numbers.json', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    const numbers = JSON.parse(data);
    const nextNumber = Math.max(...numbers) + 1;
    res.send({ nextNumber });
  });
});

app.post('/add-number', (req, res) => {
  fs.readFile('numbers.json', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    const numbers = JSON.parse(data);
    const nextNumber = Math.max(...numbers) + 1;
    numbers.push(nextNumber);

    fs.writeFile('numbers.json', JSON.stringify(numbers), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      res.send({ nextNumber: nextNumber + 1 });
    });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

