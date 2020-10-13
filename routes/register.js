const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const Account = require('../models/account');
const User = require('../models/user');

const router = express.Router();

const saltRounds = 10;

const errorFormatter = ({ msg }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
};

router.post('/register/', [
    body('email')
    .exists().withMessage('Email is required.')
    .isEmail().withMessage('Must be email.'),
    body('password')
    .notEmpty().withMessage('Password must be required.')
    .isLength({ min: 8}).withMessage('Password must have 8 or more.'),
    body('confirmPassword')
    .notEmpty().withMessage('Confirm password must be required.'),
    body('firstName')
    .notEmpty().withMessage('Firstname must be required.')
    .isString().withMessage('Firstname must be string.')
], async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0]);
    }

    else {
        const payload = req.body;

        /// check confirm password.
        if (payload.password !== payload.confirmPassword)
            return res.status(400).send('Password and Confirm password must be match.');

        /// hashing password with bcrypt.
        bcrypt.hash(payload.password, saltRounds, async (err, hash) => {
            if (err) 
                return res.status(500).send();
            else {
                const account = new Account({
                    email: payload.email,
                    password: hash
                });

                /// save account to db.
                await account.save(async (err) => {
                    if (err) 
                        return res.status(409).send('Email is already taken.')
                    else {
                        /// account_id increment.
                        account.setNext('account_id');
        
                        /// save user to db.
                        const user = new User(payload);
                        await user.save();
                        
                        res.status(201).send('Account Created.');
                    }
                }); 
            }
        }); 
    }
});

module.exports = router;