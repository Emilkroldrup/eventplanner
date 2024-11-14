require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/auth', authRoutes);
// app.use('/events', eventRoutes);
app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
