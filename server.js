const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // Extra Credit

const app = express();
app.use(cors());
app.use(express.json());

// Extra Credit: Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later"
});
app.use(limiter);

const db = mysql.createConnection({
  host: 'mysql-1e30a13e-johnadrianestrada-f2fa.g.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_NFvsxlllcSvYhx2fe6-', 
  database: 'defaultdb',
  port: 15815
});

// Extra Credit: Detailed Error Logging
db.connect((err) => {
  if (err) {
    console.error(`[${new Date().toISOString()}] DATABASE ERROR: ${err.message}`);
  } else {
    console.log('Successfully connected to Aiven MySQL.');
  }
});

app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(sql, [name, price], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Saved!', id: result.insertId });
  });
});

app.listen(10000, () => { console.log('Server is running on port 10000'); });