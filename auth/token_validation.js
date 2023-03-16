const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.TOKEN_KEYID, (err, decoded) => {
                if (err) {
                    res.send(JSON.stringify({ success: false, message: "Invalid token",result:[] }));
                } else {
                    next();
                }
            })
        } else {
            res.send(JSON.stringify({ success: false, message: "Access denied! unautorized user",result:[] }));
        }
    }
};