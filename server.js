const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Database Connection (Define this FIRST)
const db = mysql.createConnection({
  host: 'mysql-1e30a13e-johnadrianestrada-f2fa.g.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_NFvsxlllcSvYhx2fe6-',
  database: 'defaultdb',
  port: 3306 
});

// 2. Test the connection in your console
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// 3. Home Route
app.get('/', (req, res) => {
  res.send('API is Live and Running!');
});

// 4. Products Route (Define this AFTER db is created)
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