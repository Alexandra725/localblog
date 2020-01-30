 //#region  administrados o publicador
 const ObjectId = require('mongodb').ObjectId;

 const  autorComment = async (req, res, next) => {

    let user = req.user;
    let commentId = req.params.id;
    let comment = await req.app.locals.dbo.collection('comments').findOne({_id: new ObjectId(commentId)});
    if (comment.userId.toString() === user._id) {
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
module.exports = autorComment;