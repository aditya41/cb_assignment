const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {

        const token = req.header('Authorization')

        console.log(token)
        if (!token) {
            return res.status(400).send('token undef')
        }
        const decoded = await jwt.verify(token, 'jwtsecretkey')

        const user = await User.findOne({ _id: decoded._id, token })
        console.log(user)

        if (!user) {
            return res.status(400).send('hii, login man!') //.render('login.html')
        }
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.', err })
    }
}

module.exports = auth