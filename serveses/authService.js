const User = require('../models/createUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, saltRounds, isAdmin } = require('../secrets/auth')


const register = async ({ username, password }) => {

    // TO DO:  check if username is free
    try {
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPass = await bcrypt.hash(password, salt);
        let user = new User({ username, password: hashPass });
        await user.save();
        console.log('saved')
        return;
    } catch (erroe) {
        error.message = 'Process failed! Try again!'
    }
};

const login = async ({ username, password }) => {
    try {
        let user = await User.findOne({ username: username });
        if (!user) { throw { message: 'No user with this username ot password' } };

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { throw { message: 'Wrong password!' } };

        let admin = user.isAdmin;
        let token = jwt.sign({ _id: user._id, name: username, admin: admin }, secret);
        return token;

    } catch (error) {
        error.message = 'Wrong password!'
    }
}

module.exports = {
    register,
    login
};