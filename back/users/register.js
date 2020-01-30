//#region generic Dependences
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');


//#endregion

router.post('/register',(req, res) => {
    
    const data = req.body;

    const newUser= {
        name: data.name,
        lastName: data.lastName,
        nickName: data.nickName,
        email: data.email,
        pass: bcryptjs.hashSync(data.pass),
        role: data.role || 'PUBLI'
    };
    req.app.locals.dbo.collection('users').insertOne(newUser);
    res.send(newUser);
    console.log('registro bien hecho')
});

module.exports = router;