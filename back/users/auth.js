const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const config = require('../config/config.js');

//#region  AuthEndpoints
router.post('/login', (req, res) => {

    req.app.locals.dbo.collection('users').findOne({
            email: req.body.email
        })
        .then(data => {
            if (!data) {
                res.status(400).json({
                    status: true,
                    msg: "User not found"
                });
            } else {
                bcryptjs.compare(req.body.pass, data.pass)
                    .then(isMatch => {
                        if (isMatch) {
                            let token = jwt.sign({user: data}, config.key, {
                                expiresIn: 60 * 60 * 24 * 30
                            });
                            console.log('ha ido bien'),
                            res.status(200).json({
                                success: true,
                                user: data,
                                token,
                                msg: "login OK"
                            });

                        } else {
                            res.status(401).json({
                                success: true,
                                msg: "You have not access"
                            });
                            console.log('no ha ido bien')
                        }
                    })
                    .catch((Error) => {
                        res.status(400).json({
                            Error,
                            msg: 'Error'
                        });
                    });
            }
        });
});

//#endregion



module.exports = router;