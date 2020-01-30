const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/blogDB";
const app = express();
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization", );
    return next();
});


app.use('/', require('./routes/post'));
app.use('/', require('./routes/comments'));
app.use('/', require('./users/auth.js'));
app.use('/', require('./users/register.js'));
app.use('/', require('./users/users.js'))


MongoClient.connect(url, { useUnifiedTopology: true }, (err, db)=> {
    if (err) {
        console.log('database is not connected')
        console.error(err);
    }
    else {
        console.log('connected!!');
        dbo = db.db("blogDB");
        app.locals.dbo = dbo;
        app.listen(3000, ()=> {
            console.log('Node listen in 3000.')
        });
    }
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(3443, () => {
    console.log("Https server started in port 3443");
});

module.exports = app; 