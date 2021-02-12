const User = require('../models/createUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, saltRounds, isAdmin } = require('../secrets/auth')


const register = async ({ username, password }) => {

    let user = await User.findOne({username});
    if (user) throw {message: 'Sorry, this user already exist! Please enter another username!'}
    try {
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPass = await bcrypt.hash(password, salt);
        let user = new User({ username, password: hashPass });
        await user.save();
        console.log('saved')
        return;
    } catch (error) {
        throw error;
    }
};

const login = async ({ username, password }) => {
    try {
        let user = await User.findOne({ username: username });
        if (!user) throw { message: 'No user with this username!' };

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw { message: 'Invalid password! Try again!' };
        let admin = user.isAdmin;
        let token = jwt.sign({ _id: user._id, name: username, admin: admin }, secret);
        return token;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    register,
    login
};