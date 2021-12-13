const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config')

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)){
        req.auth = {
            async register(email, password, gender) {
                const token = await register(email, password, gender)
                res.cookie(COOKIE_NAME, token)
            },
            async login(email, password){
                const token = await login(email, password)
                res.cookie(COOKIE_NAME, token)
            },
            logout(){
                res.clearCookie(COOKIE_NAME);
            }
        }
        next();
    }
}

async function register(email, password, gender){
    const existing = await userService.getUserByEmail(email);

    if (existing){
        throw new Error('Email is taken!')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, hashedPassword, gender)

    return generateToken(user)
}

async function login(email, password){
    const user = await userService.getUserByEmail(email);

    if (!user){
        throw new Error('Incorrect email or password')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch){
        throw new Error('Incorrect password or email')
    }

    return generateToken(user)
    
}

function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        email: userData.email
    }, TOKEN_SECRET);
}

function parseToken(req, res){
    const token = req.cookies[COOKIE_NAME];

    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
            return true;
        }
        catch (err) {
            res.clearCookie(COOKIE_NAME)
            res.redirect('/auth/login')
            return false;
        }
    }
    return true;
}