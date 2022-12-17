const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../Schema/userSchema');

const router = express.Router();
// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema);

// signUp method for users
router.post('/signup', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: 'Data inserted successfully',
        });
    } catch (error) {
        res.status(500).json({
            error: console.log(error),
        });
    }
});

// login method for users
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        // eslint-disable-next-line no-underscore-dangle
                        userId: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                        // eslint-disable-next-line prettier/prettier
                    },
                );
                res.status(200).json({
                    access_token: token,
                    message: 'login sucessful',
                });
            } else {
                res.status(401).json({
                    message: 'Autentication failed',
                });
            }
        } else {
            res.status(401).json({
                message: 'Autentication failed',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: console.log(error),
        });
    }
});
module.exports = router;
