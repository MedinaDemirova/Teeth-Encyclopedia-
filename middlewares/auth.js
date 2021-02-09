const jwt = require('jsonwebtoken');
const { secret, tokenName } = require('../secrets/auth');
module.exports = function () {
    return (req, res, next) => {

        let token = req.cookies[tokenName];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.clearCookie(tokenName);
                }else{
                    req.user = decoded ;
                }
               
            })
        }
        next()
    }
};