const express = require('express');
const app = express();
// Add your database connection and routes here!

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});