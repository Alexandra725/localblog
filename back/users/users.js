const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const tokenVerify = require('../middleware/tokenVerify.js')

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
        req.app.locals.dbo.collection('posts').find({ userId: new ObjectId(userId)}).toArray((err, response) => {
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