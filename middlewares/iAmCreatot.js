module.exports = (req, res, next) => {
    if (req.user.admin == false) {
        return res.redirect('/')
    }
    next();
}