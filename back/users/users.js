const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const bcryptjs = require('bcryptjs');

const tokenVerify = require('../middleware/tokenVerify.js')

//#region Load a ADMIN user

router.get('/', async (req, res) => {
    const defaultUser = {
        name: "Admin",
        lastName: "Admin",
        nickName: "Admin",
        email: "admin@admin.com",
        pass: bcryptjs.hashSync("1234"),
        role: "ADMIN"
    }
    await req.app.locals.dbo.collection('users').find({}).toArray((err, users) => {
        if (users.length === 0) {
            req.app.locals.dbo.collection('users').insert(defaultUser, (err, user) => {
                if (err) {
                    res.send(err)
                }
                console.log("admin inserted:", defaultUser);
            })
        } else {}
    });
});

//#endregion

//#region perfil usuario

router.get('/perfil', tokenVerify, async (req, res) => {

    await req.app.locals.dbo.collection('users').find({}).toArray((err, user) => {
        const userId = req.user._id;
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }
        req.app.locals.dbo.collection('posts').find({
            userId: new ObjectId(userId)
        }).toArray((err, response) => {
            res.send({
                success: true,
                msg: 'good get',
                user: req.user,
                posts: response
            });
        });
    });
});

//#endregion



module.exports = router;