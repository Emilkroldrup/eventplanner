require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const path = require('path');
const eventsRoutes = require('./routes/eventRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/auth', authRoutes);
app.use('/', homeRoutes);
app.use('/events', eventsRoutes);
app.use('/user', userRoutes);
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
