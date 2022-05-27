const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationCode: {type: String},
}, {timestamps: true})

module.exports = model('User', UserSchema);
