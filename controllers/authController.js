const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const hashPassword = require('../service/hashPassword');
const secretKey = process.env.JWT_SECRET;

// User registration
exports.register = async (req, res) => {
    const { firstName, lastName, age, phoneNumber, email, password, address } = req.body;
    try {
        const hashedPassword = hashPassword(password); // Hashes the password and adds salt
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};

// User login
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({error: 'User not found'});

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({error: 'Invalid password'});

        // Generate a token
        const token = jwt.sign({email: user.email, id: user._id}, secretKey, {expiresIn: '1h'});
        res.status(200).json({token, message: "Login succesful"});
    } catch (error) {
        res.status(500).json({error: "Login failed"});
    }
};

exports.renderLoginPage = (req, res) => {
    res.render('login', {
        pageTitle: 'login',
    });
};
