const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const {isGuest, isUser} = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register')
})


module.exports = router;