const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AccountSchema = mongoose.Schema({
    account_id: Number,
    email: {
        type: String,
        unique: true
    },
    password: String
}, {
    /// strict true -> don't save any field apart from Schema.
    strict: true
});

AccountSchema.plugin(AutoIncrement, {
    inc_field: 'account_id',
    disable_hooks: true
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;