const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt"); 
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT  = passportJWT.ExtractJwt;

const bcrypt = require('bcrypt');

const Account = require('../models/account');

require('dotenv').config()

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, cb) => {
    return await Account.findOne({ email })
        .then(account => {
            /// user identify.
            if (!account) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            } 
            else {
                /// check password.
                bcrypt.compare(password, account.password, (err, result) => {
                    if (result) { 
                        /// password is not match.
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    }
                    else {
                        return cb(null, account, null);
                    }
                });
            }
        })  
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.SECRETKEY}`
}, (jwtPayload, cb) => { 
        /// if return null -> got 401. 
        return cb(null, jwtPayload);
    }
));

module.exports = passport;