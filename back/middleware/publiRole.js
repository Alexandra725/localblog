 //#region  Publisher
 const ObjectId = require('mongodb').ObjectId;

 const  publiRole = async (req, res, next) => {

    let user = req.user;
    let postId = req.params.id;
    let post = await req.app.locals.dbo.collection('posts').findOne({_id: new ObjectId(postId)});
    if (post.userId.toString() === user._id) {
        console.log('ENTRA') 
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                msg: 'PUBLI: No tienes permiso para realizar esta acción'
            }
        });
    } 
}
 //#endregion
 
module.exports = publiRole;