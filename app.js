require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const path = require('path');
const eventsRoutes = require('./routes/eventRoutes');
const setupSwagger = require('./service/swaggerService');
const { createServer } = require("node:http");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sætter EJS som view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Server static filer
app.use(express.static(path.join(__dirname, 'public')));

// Global authentication middleware
app.use((req, res, next) => {
    if(req.cookies.authToken) {
        try {
            const decoded = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
            res.locals.user = decoded;
            req.user = decoded;
        } catch (err) {
            console.error('Failed to decode token:', err.message);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
});

// Initialize Swagger
setupSwagger(app);

// create server for testing
const server = createServer(app);


// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/', homeRoutes);
app.use('/user', userRoutes);
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app