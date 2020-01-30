
//#region Administrador
const adminRole = (req, res, next) => {

    let user = req.user;
    if (user.role === 'ADMIN') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                msg: 'ADMIN: No tienes permiso para realizar esta acción'
            }
        });
    }
}
 //#endregion


module.exports = adminRole
