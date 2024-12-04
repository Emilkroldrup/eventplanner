const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const hashPassword = require('../service/hashPassword');
const secretKey = process.env.JWT_SECRET;

// User registration
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, age, phoneNumber, address } = req.body

    if (!firstName || !lastName || !email || !password || !age || !phoneNumber ) {
        console.log('All fields are required');
        return res.status(400).json({error: 'All fields are required'});
    }

    try {
        const hashedPassword = await hashPassword(password); // Hashes the password
        console.log('Hashed password', hashedPassword);

        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            phoneNumber,
            address,
        };

        // Saves to database
        const newUser = new userModel(user);
        await newUser.save();

        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration failed', error);
        res.status(500).json({ error: "Registration failed" });
    }
};

// User login
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({error: 'User not found'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)  {
            console.log('Invalid credentials');
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // Generate a token
        const token = jwt.sign({email: user.email, id: user._id}, secretKey, {expiresIn: '1h'});
        res.status(200).json({token, message: "Login succesful"});
    } catch (error) {
        console.error('Login failed', error);
        res.status(500).json({error: "Login failed"});
    }
};

exports.renderLoginPage = (req, res) => {
    res.render('login', {
        pageTitle: 'login',
    });
};
