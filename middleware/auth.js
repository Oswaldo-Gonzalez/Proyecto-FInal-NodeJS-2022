const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.users = decoded;
        next();
    }
    catch(error){
        res.status(401);
        res.json({code: 401, message: "You have not permission"});
    }
}