module.exports = (req, res, next) => { // Root address
    return res.status(200).json({code: 1, messsage: "Welcome to Taller de Node.js S.A. de C.V. employee system"});
}