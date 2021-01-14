const mongoose = require('mongoose')


const JobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ctc: {
        type: String,
        required: true
    },
    // },
    // companyLogo: { //doubtful
    //     type: Buffer
    // },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    resume: [{
        type: String
    }]

}, {
    timestamps: true
})

const Job = mongoose.model('Job', JobSchema)

module.exports = Job