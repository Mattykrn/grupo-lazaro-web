require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const storiesRouter = require('./routes/stories');
const path = require('path');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/stories', storiesRouter);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
