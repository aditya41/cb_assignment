const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isMobilePhone("" + value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    jobsApplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs'
    }],
    appliedId: [{
        type: String,
    }],
    token: {
        type: String
    },
    resume: {
        type: String

    }
}, {
    timestamps: true
})

UserSchema.methods.generateJwtToken = async function() {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(),
    }, "jwtsecretkey", {
        expiresIn: 6 * 31 * 24 * 60 * 60 // 6 months !!
    })
    return token
}

const User = mongoose.model('User', UserSchema)

module.exports = User