const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

//#region  verificar token

const tokenVerify = (req, res, next) => {
    let token = req.get('Authorization');
    token = token.split(' ')[1];
    jwt.verify(token, config.key, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    msg: 'Invalid token',
                    err
                }
            });
        }
        req.user = decoded.user
        next();
    });
}

//#endregion

module.exports = tokenVerify