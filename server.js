const express = require('express'); // 1. Add this
const app = express();              // 2. Add this
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});