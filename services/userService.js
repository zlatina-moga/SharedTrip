const User = require('../models/User');

async function createUser(email, hashedPassword, gender) {
    const user = new User({
        email,
        hashedPassword,
        gender
    });

    await user.save()
    return user;
}

async function getUserByEmail(email) {
    const pattern = new Regexp(`^${email}$`, 'i')
    const user = await User.findOne({email: {$regex: pattern}}).lean()

    return user;
}

module.exports = {
    createUser,
    getUserByEmail
}