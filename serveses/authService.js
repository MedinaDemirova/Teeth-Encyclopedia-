const User = require('../models/createUser');
const bcrypt = require('bcrypt');

let saltRounds = 10;

const register = async ({ username, password }) => {
    try {
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPass = await bcrypt.hash(password, salt);
        let user = new User({ username, password: hashPass });
        return await  user.save();
    } catch(erroe){
        error.message = 'Process failed! Try again!'
    }
};

module.exports = {
    register
};