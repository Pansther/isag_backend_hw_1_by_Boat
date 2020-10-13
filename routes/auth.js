const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login/', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, account, info) => { 
        if (err) return next(err);

        if (account) {
            const token = jwt.sign({ account_id: account.account_id }, `${process.env.SECRETKEY}`);
            return res.json({ token });
        }
        else {  
            return res.status(422).json(info);
        }
    })(req, res, next)
});

module.exports = router;