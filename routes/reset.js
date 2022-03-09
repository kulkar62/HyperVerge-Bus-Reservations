const router = require('express').Router()
const User = require('../model/User');
const verify = require('./verifyToken');

// Reset all reservations
// Admin access only
router.patch('/seat/reset', verify, async (req, res) => {

    const adminDocument = await User.findById(req.user._id)
    if(adminDocument.email === "admin@createmytrip.com")
    {
        const result = await User.updateMany({seatNumber: null});
        res.send('reservations reset!');
    }
    else
        res.send('Access denied');

});

module.exports = router;