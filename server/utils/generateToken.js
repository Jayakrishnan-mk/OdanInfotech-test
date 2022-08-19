const jwt = require('jsonwebtoken');

const maxAge =  24 * 60 * 60 * 1000 ;

const createToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

module.exports = {maxAge, createToken};