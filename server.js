const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // This allows the API to read your "Nike" input

const db = mysql.createConnection({
  host: 'mysql-1e30a13e-johnadrianestrada-f2fa.g.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_NFvsxlllcSvYhx2fe6-', 
  database: 'defaultdb',
  port: 15815
});

// GET: Fetches the list to show on your screen
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST: Actually saves "Nike" into the Aiven Database
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(sql, [name, price], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Saved!', id: result.insertId });
  });
});

app.listen(10000, () => { console.log('Server is running on port 10000'); });