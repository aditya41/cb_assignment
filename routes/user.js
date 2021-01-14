const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/signup', async(req, res) => {
    console.log('hi')
    console.log(req.body)
    try {
        const user = new User(req.body)
        const token = await user.generateJwtToken()

        user.token = token
        await user.save()
        res.status(200).send({...user._doc })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        if (!user)
            return res.status(400).send('wrong credentials')
        const token = await user.generateJwtToken()
        user.token = token
        await user.save()
        res.status(200).send({...user._doc })
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/logout', auth, async(req, res) => {
    try {

        const user = await User.findOne({ _id: req.user._id })
        user.token = ""
        console.log(user)
            // console.log(user)
        await user.save()
        res.status(200).send('loggedout')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router