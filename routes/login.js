const router = require('express').Router()
const User = require('../model/User');
const {registerValidation, loginValidation, reserveValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Login for existing users
router.post('/login', async (req, res) => {
    // Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if email is in database
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid login');

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid login');

    // Create a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;