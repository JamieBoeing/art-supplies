require('dotenv').config
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SALT_ROUNDS = 6

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String,
        unique: true,
        trim: true,
        lowercase: true, 
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function(next) {
    // 'this' is the use document
    if (!this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
}
     next();
})
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, SECRET)
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User