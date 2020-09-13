const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('username', 'Minimum name length 2 characters').isLength({ min: 2, max: 16 }),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum password length 6 characters').isLength({ min: 6, max: 16 }),
        check('passwordSecond', 'Minimum password length 6 characters').isLength({ min: 6, max: 16 })
    ],
    async (req, res) => {

    try {
        console.log("body", req.body);
        // Check errors
        const errors = validationResult(req);
        // If errors not empty return error message
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect registration data"
            })
        }
        // Get some data from body
        const {username, email, password, passwordSecond} = req.body;
        // Check user on DB
        const candidate = await User.findOne({email});
        // If user exists return message
        if(candidate) {
            return res.status(400).json({message: 'This user already exists'});
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Compare password with second password
        const isMatchPassword = await bcrypt.compare(passwordSecond, hashedPassword);
        // If passwords doesn't match return error message
        if(!isMatchPassword) {
            return res.status(400).json({message: `Sorry, passwords doesn't match`});
        }
        // Create new user according User model
        const user = new User({username, email, password: hashedPassword});
        // Save user on DB
        await user.save();
        // Response message with status
        res.status(201).json({message: "New user created! Now Login!"})
    } catch (e) {
        // Error message if something went wrong
        res.status(500).json({message: 'Something went wrong, try again'});
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter a valid e-mail').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect login details"
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User is not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Wrong password"})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );
        res.status(200).json({token, id: user.id, username: user.username, email: user.email, history: user.history, admin: user.admin, sounds: user.sounds, nightMode: user.nightMode, message: "Login successfully"})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
});

// /api/auth/history
router.put(
    '/history',
    [
        check('email', 'Error in user email address').normalizeEmail().isEmail(),
        check('history', 'Nothing in history array').isArray()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "History is empty"
                })
            }

            const {email, history} = req.body;

            await User.updateOne({email: email}, {
                $set: {
                    history: [...history]
                }
            });

            res.status(201).json({message: "Your request saved to history"})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    });

// /api/auth/sounds
router.put(
    '/sounds',
    [
        check('email', 'Error in user email address').normalizeEmail().isEmail(),
        check('sounds', 'Error in data type').isBoolean()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Errors in sounds effect"
                })
            }

            const {email, sounds} = req.body;

            await User.updateOne({email: email}, {
                $set: {
                    sounds: sounds
                }
            });

            res.status(201).json({message: "Your sounds effect status change successfully"})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    });

// /api/auth/nightmode
router.put(
    '/nightmode',
    [
        check('email', 'Error in user email address').normalizeEmail().isEmail(),
        check('nightMode', 'Error in data type').isBoolean()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Errors in night mode effect"
                })
            }

            const {email, nightMode} = req.body;

            await User.updateOne({email: email}, {
                $set: {
                    nightMode: nightMode
                }
            });

            res.status(201).json({message: "Your night mode effect status change successfully"})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    });

module.exports = router;