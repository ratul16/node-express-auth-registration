const router = require('express').Router();
const userSchema = require('../models/User');
const { } = require('../validate');

router.post('/signup/', async (req, res) => {
    const user = new userSchema({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const storeUser = await user.save();
        res.send(storeUser);

    } catch (err) {
        res.status(400).send(err);
    }

});


router.post('/signin/', (req, res) => {
    res.send("Sign In Routes");
});

router.get('/getuser/', (req, res) => {
    res.send('Sending all user info');
});

module.exports = router;