//Middleware function to check wether the user is registered

const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    const token =req.header('x-jwt-vidly-token');
        if(!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded= jwt.verify(token, config.get('jwtPrivateKey'));
        // now user has decoded data such as useId and 
        req.user = decoded
        next();
    }
    catch (ex){
        res.status(400).send('Invalid token.');
    }
}


module.exports = auth;