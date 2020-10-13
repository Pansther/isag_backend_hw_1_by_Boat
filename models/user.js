const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({
    user_id: {
        type: Number,
        immutable: true
    },
    firstName: String,
    lastName: {
        type: String,
        default: ''
    },
}, {
    /// strict true -> don't save any field apart from Schema.
    strict: true
});

UserSchema.plugin(AutoIncrement, {
    inc_field: "user_id"
});

const user = mongoose.model('user', UserSchema);

module.exports = user;