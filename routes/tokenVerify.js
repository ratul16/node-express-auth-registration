const JWT = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.header('auth-header');
    if (!token) return res.send({
        statusCode: 401,
        message: "Access Denied"
    });


    try {
        const verified = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.send({
            statusCode: 400,
            message: "Invalid Token"
        });
    }
}

module.exports = auth;