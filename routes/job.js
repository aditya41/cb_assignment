const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const Job = require('../models/jobs')
const auth = require('../middleware/auth')
const { findById } = require('../models/user')

// adding jobs
router.post('/addjobs', async(req, res) => {
        const job = new Job(req.body)

        try {
            await job.save()
            res.send(job)
        } catch (err) {
            res.status(400).send(err)
        }

    })
    // for over view
router.get('/getjobs', auth, async(req, res) => {
    try {

        const jobs = await Job.find({});

        res.send(jobs)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/apply', auth, async(req, res) => {
        try {
            console.log(req.user)
            if (!req.body.resume)
                return res.status(400).send('give the resume buddy')
            const job = await Job.findOne({ jobId: req.body.jobId })
            if (!job)
                return res.status(400).send('no job id exists')
            let applied_already = 0

            req.user.appliedId.forEach(job1 => {

                if (job1 === job.jobId) {
                    applied_already = 1;
                }
                // console.log(job1.jobId, job.jobId)
            });
            if (applied_already == 1)
                return res.status(402).send('applied already')
            req.user.appliedId = req.user.appliedId.concat(job.jobId)

            job.resume = job.resume.concat(req.body.resume)
                // if already applied return 

            job.applicants = job.applicants.concat({ _id: req.user._id }) // doubtful
            req.user.resume = req.body.resume

            req.user.jobsApplied = req.user.jobsApplied.concat({ _id: job._id })
                // console.log('ghj')
            await job.save();
            await req.user.save()
            res.status(200).send({ user: req.user, job })
        } catch (err) {
            // console.log('ghj')
            // console.log(err)
            res.status(400).send({ err })
        }
    })
    // for particular view
router.get('/particularJob/', async(req, res) => {
    try {
        const job = await Job.findOne({ jobId: req.query.id }) // jobId
        res.status(200).send(job);
    } catch (err) {
        res.status(400).send(err)
    }
})
module.exports = router



// /apply   /getjob   /postjob  /