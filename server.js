const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Allow the app to use JSON
app.use(express.json());

// Serve the index.html file when root ('/') is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define the route for '/Auditor/Mfg-Homes-Counter/'
app.get('/Auditor/Mfg-Homes-Counter/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.argv[2] || 3000; // If no argument is provided, the port will default to 3000.

// Check if /usr/src/app/data/numbers.json exists, if it does, use that path, otherwise, fall back to 'numbers.json'
const numbersPath = fs.existsSync('/usr/src/app/data/numbers.json') ? '/usr/src/app/data/numbers.json' : 'numbers.json';

// Update the route for '/next-number' to '/next-number'
app.get('/next-number', (req, res) => {
  fs.readFile(numbersPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    const numbers = JSON.parse(data);
    const nextNumber = Math.max(...numbers) + 1;
    res.send({ nextNumber });
  });
});

// Update the route for '/add-number' to '/add-number'
app.post('/add-number', (req, res) => {
  fs.readFile(numbersPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    const numbers = JSON.parse(data);
    const nextNumber = Math.max(...numbers) + 1;
    numbers.push(nextNumber);

    fs.writeFile(numbersPath, JSON.stringify(numbers), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      // Send the next number that will be added next time
      res.send({ nextNumber: nextNumber + 1 });
    });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
