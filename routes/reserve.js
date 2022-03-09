const router = require('express').Router()
const User = require('../model/User');
const {registerValidation, loginValidation, reserveValidation} = require('../validation')
const verify = require('./verifyToken');


// Reserve a seat
router.patch('/seat/reserve', verify, async (req, res) => {
    // Validation
    const {error} = reserveValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const options = {new: true}

    // Make reservation if seat is not taken
    const seatTaken = await User.exists({seatNumber: req.body.seatNumber});
    if(!seatTaken)
    {
        const result = await User.findByIdAndUpdate(req.user._id, req.body, options);
        res.send(result)
    }
    else
    {
        res.send('the seat is already taken!')
    }

});

module.exports = router;