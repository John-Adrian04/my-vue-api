const express = require('express');
const mysql = require('mysql2'); // Ensure you have this installed
const cors = require('cors');    // Highly recommended for Vue apps
const app = express();

app.use(cors());
app.use(express.json());

// 1. Database Connection
const db = mysql.createConnection({
  host: 'mysql-johnadrian.com',
  user: 'admin',
  password: '123456',
  database: 'deployment',
  port: 3306 // or your specific port
});

// 2. Test Route (The "Home" page)
app.get('/', (req, res) => {
  res.send('API is Live and Running!');
});

// 3. Your Data Route (This is what you'll screenshot)
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});