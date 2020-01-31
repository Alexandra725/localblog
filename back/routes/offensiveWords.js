const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();


const tokenVerify = require('../middleware/tokenVerify.js');
const adminRole = require('../middleware/adminRole.js');
//#region GET Palabras ofensivas

router.get('/badwords', async (req, res) => {

    await req.app.locals.dbo.collection('dirtyWords').find().toArray((err, response) => {
        res.json(response);
    });
});

//#endregion

//#region POST palabras ofensivas

router.post('/badwords', tokenVerify, adminRole,async (req, res) => {

    const newWord = {
        word: req.body.word,
        level: req.body.level
    };
    await req.app.locals.dbo.collection('dirtyWords').insertOne(newWord);
    res.send(newWord);

});

//#endregion

router.get('/badwords/:id', tokenVerify, adminRole ,async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('dirtyWords').findOne({
        _id: new ObjectId(id)
    }, (err, word) => {
        if (!word) {
            res.sendStatus(404);
        } else {
            res.send(word)
        }
    });
});

//#region PUT una palabra ofensiva

router.put('/badwords/:id', tokenVerify, adminRole ,async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('dirtyWords').findOneAndUpdate({_id: new ObjectId(id)},{
        $set: req.body},{returnOriginal: false}, (err, response) => {
        if (!response) {
            res.sendStatus(404);
        } else {
           res.send(response.value);
        }
    });
});

//#endregion

//#region PUT una palabra ofensiva
router.delete('/badwords/:id', tokenVerify, adminRole ,async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('dirtyWords').findOne({
        _id: new ObjectId(id)
    }, (err, post) => {
        if (!post) {
            res.sendStatus(404);
        } else {
            req.app.locals.dbo.collection('dirtyWords').deleteOne({
                _id: new ObjectId(id)
            });
            res.sendStatus(200);
        }
    });
});

//#endregion

module.exports = router;