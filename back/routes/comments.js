const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

const validator = require('../functions/validator');
const tokenVerify = require('../middleware/tokenVerify.js');
const autorComment = require('../middleware/adminPubliRole.js');
const badWords = require('../functions/badWords.js')

//#region  POST comentario en un post

router.post('/post/:id/comments',tokenVerify, async (req,res) => {
    const postId = req.params.id;
    const data = req.body;
    const date = new Date(); 
    const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    const newComm = {
        userId: new ObjectId(req.user._id),
        userName: req.user.name,
        postId: new ObjectId(postId),
        text: data.text,
        date: date.toLocaleDateString("es-ES", options)
    };
    await req.app.locals.dbo.collection('dirtyWords').find().toArray((err, words)=>{
       if(words.length === 0) {
           words = badWords
        validator(newComm.text, words)
        .then(async ()=>{
           await req.app.locals.dbo.collection('comments').insertOne(newComm);
            res.send(newComm);
        }).catch(err=>{
            console.log('error',err)
            res.status(406).send(err);
        });
       }
    });
});

//#endregion

//#region  GET de post con los comentarios
router.get('/comments', async (req, res) => {
     await req.app.locals.dbo.collection('comments').find().toArray((err, comments) => {
        res.send(comments);
    });
});

router.get('/comment/:id', async (req,res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('comments').findOne({ _id: new ObjectId(id) }, (err, comment) => {
        if(!comment) {
            res.sendStatus(404);
        } else {
            res.send(comment)
        }
    });
});

//#endregion

//#region DELETE un comentario

router.delete('/comments/:id',tokenVerify, autorComment, async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('comments').findOne({ _id: new ObjectId(id)}, (err, comment) => {
        if(!comment){
            res.sendStatus(404);
        } else {
            req.app.locals.dbo.collection('comments').deleteOne({_id: new ObjectId(id)});
            res.sendStatus(200);
        }
    });
});

//#endregion

//#region PUT de un comentario

router.put('/comments/:id',tokenVerify, autorComment, async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('comments').findOne({_id: new ObjectId(id)}, (err, comment) => {
        if(!comment) {
            res.sendStatus(404);
        } else {
            const data = req.body;
            req.app.locals.dbo.collection('comments').updateOne({_id: new ObjectId(id)}, {$set: data}, {returnOriginal: false});
            res.send(comment);
        }
    });
});
//#endregion

module.exports = router;