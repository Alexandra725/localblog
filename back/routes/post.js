const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

const tokenVerify = require('../middleware/tokenVerify.js');
const publiRole = require('../middleware/publiRole.js')

//#region GET todos los posts

router.get('/posts', async (req, res) => {
  await req.app.locals.dbo.collection('posts').find({}, {
        projection: {
            title: 1,
            description:1,
            name: 1,
            date:1,
            _id: 1
        }
    }).toArray((err, response) => {
        res.json(response);
    });
});
//#endregion

//#region  Post de post nuevo

router.post('/post', tokenVerify, async (req, res) => {
    const date = new Date(); 
    const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    const newPost = {
        userId: new ObjectId(req.user._id),
        name: req.user.name,
        nickname: req.user.nickName,
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        date: date.toLocaleDateString("es-ES", options)
    };
    await req.app.locals.dbo.collection('posts').insertOne(newPost);
    res.send(newPost);
});

//#endregion

//#region GET de los posts del mismo usuario

router.get('/post',  async (req, res) => {
    const userId = req.user._id;
    await req.app.locals.dbcollection('posts').find({ userId: new ObjectId(userId)}).toArray((err, response) => {
        res.send(response);
    });

});

//#endregion

//#region GET de un post 

router.get('/post/:id', async (req, res) => {

    const id = req.params.id;
    await req.app.locals.dbo.collection('posts').findOne({ _id: new ObjectId(id)}, (err, response) => {
        if (!response) {
            res.sendStatus(404);
        } else {
            req.app.locals.dbo.collection('comments').find({
                postId: new ObjectId(id)
            }).toArray((err, comments) => {
                res.send({
                    post: response,
                    comments
                });
            });
        }
    });
});

//#endregion

//#region  DELETE de un post

router.delete('/post/:id', tokenVerify, publiRole, async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('posts').findOne({ _id: new ObjectId(id) }, (err, post) => {
        if (!post) {
            res.sendStatus(404);
        } else {
            req.app.locals.dbo.collection('posts').deleteOne({ _id: new ObjectId(id)});
            res.app.locals.dbo.collection('comments').deleteMany({ postId: new ObjectId(id)});
            res.sendStatus(200);
        }
    }); 
}); 

//#endregion

//#region  PUT de un post

router.put('/post/:id', tokenVerify, publiRole, async (req, res) => {
    const id = req.params.id;
    await req.app.locals.dbo.collection('posts').findOneAndUpdate({_id: new ObjectId(id)},{
        $set: req.body},{returnOriginal: false}, (err, response) => {
        if (!response) {
            res.sendStatus(404);
        } else {
           res.send(response.value);
        }
    });
});


//#endregion

module.exports = router;