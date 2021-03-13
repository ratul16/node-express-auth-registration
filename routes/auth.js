const router = require('express').Router();
const userSchema = require('../models/User');
const JWT = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validate');
const verify = require('./tokenVerify');


// Registration Route
router.post('/signup/', async (req, res) => {

    // Data validation
    const { error } = registerValidation(req.body);

    if (error) return res.send({
        statusCode: 400,
        message: error.details[0].message
    });

    // Existing user check
    const userExist = await userSchema.findOne({ email: req.body.email });
    if (userExist) return res.send({
        statusCode: 400,
        message: "Email already exists !!"
    });

    // Password Hashing
    const salt = Bcrypt.genSaltSync(10);
    const passwordHash = Bcrypt.hashSync(req.body.password, salt);

    // Create new User 
    const user = new userSchema({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash
    });
    try {
        const storeUser = await user.save();
        res.send({
            statusCode: 201,
            message: "New user registered successfully !!"
        });

    } catch (err) {
        res.send({
            statusCode: 400,
            message: err
        });
    }

});


// Login Route
router.post('/signin/', async (req, res) => {

    // Data validation
    const { error } = loginValidation(req.body);
    if (error) return res.send({
        statusCode: 400,
        message: error.details[0].message
    });

    // Existing user check
    const userExist = await userSchema.findOne({ email: req.body.email });
    if (!userExist) return res.send({
        statusCode: 400,
        message: "Email or password is incorrect"
    });

    //Compare Password
    const validPassword = Bcrypt.compareSync(req.body.password, userExist.password);
    if (!validPassword) return res.send({
        statusCode: 400,
        message: "Email or password is incorrect"
    });

    const token = JWT.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send({
        statusCode: 200,
        message: "Logged In !!"
    });


});
module.exports = router;