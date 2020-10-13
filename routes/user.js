const express = require('express');
const passport = require('passport');
 
const User = require('../models/user');
const Account = require('../models/account');

const router = express.Router();

const requireJWTAuth = passport.authenticate('jwt', { session: false });

router.get('/user/', requireJWTAuth, async (req, res) => {
    const user = await User.findOne({
        user_id: req.user.account_id
    }, '-_id -__v');
    
    res.json(user);
});

router.patch('/user/', requireJWTAuth, async (req, res) => {
    const payload = req.body;
    const user_id = req.user.account_id;
    await User.findOne({ user_id })
    .then(async user => {
        if (!user) 
            return res.status(404).send();
        else {
            await User.updateOne({ user_id }, { $set: payload });
            return res.status(204).send('User has updated.');
        }
    });

});

router.delete('/user/:user_id', requireJWTAuth, async (req, res) => {
    const user_id = req.params.user_id;
    await User.findOne({ user_id })
    .then(async user => {
        if (!user)
            return res.status(404).send();
        else {
            await User.deleteOne({ user_id });
            await Account.deleteOne({ account_id: user_id });
            return res.status(204).send();
        }
    });
});
 
module.exports = router;