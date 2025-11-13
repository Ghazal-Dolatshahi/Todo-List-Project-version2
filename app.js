const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const todosRouter = require('./routes/todos');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api/todos', todosRouter);

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
