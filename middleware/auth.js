const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        console.log('123')
            // console.log(req.headers)
            // console.log(req)
            // const token = req.query.token // token will be in header

        // console.log(req)
        // console.log(req.headers)
        const token = req.header('Authorization')
            // console.log(req.header)
        console.log(token)
        if (!token) {
            return res.status(400).send('token undef')
        }
        // 

        const decoded = await jwt.verify(token, 'jwtsecretkey')
            // console.log('decoded')
            // decode.then(async() => {
        const user = await User.findOne({ _id: decoded._id, token }) //doubtfulll
        console.log(user)
            // const user1 = await User.findOne({ _id: decoded._id })
            // console.log(user1)
        if (!user) {
            // console.log('hello')
            // throw new Error()
            return res.status(400).send('hii') //.render('login.html')
        }
        // console.log(token, decoded)

        req.user = user
        next()
            // }).catch((err) => {
            // console.log(err)
            // res.status(401).send({ error: 'Please authenticate.', err })
            // })

    } catch (err) {
        // console.log(err)
        res.status(401).send({ error: 'Please authenticate.', err })
    }
}

module.exports = auth