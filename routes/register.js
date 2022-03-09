const router = require('express').Router()
const User = require('../model/User');
const {registerValidation, loginValidation, reserveValidation} = require('../validation')
const bcrypt = require('bcryptjs')


// Register a new user
router.post('/register', async (req, res) => {

    // Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if email has already been used
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist)
        return res.status(400).send('Email already in use');

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        seatNumber: null,
        passengerPhone: null,
        passengerName: null,
        passengerAge: null
    });

    // Save new user to database
    try {
        const savedUser = await user.save();
        res.send({user: user._id}).status(200);
    }catch(err){
        res.status(400).send(err)
    }
});

module.exports = router;