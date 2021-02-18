module.exports = {
    secret: 'beStrong',
    saltRounds: 10,
    tokenName: 'USER_SESSION',
    english_letters_numbers_pattern: /^[a-zA-Z0-9]+$/,
    english_letters_pattern: /^[a-zA-Z]+$/,
    name_pattern: /[a-z]* *[a-z]*/,
    URI_Atlass :"mongodb+srv://medina_demirova:65566554@teeth-encyclopedia.jn7c9.mongodb.net/facts?retryWrites=true&w=majority",
    PORT :process.env.PORT || 5005,
}