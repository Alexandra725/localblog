const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/blogDB";
const app = express();
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


app.use('/', require('./routes/post.js'));
app.use('/', require('./routes/comments.js'));
app.use('/', require('./routes/offensiveWords.js'));
app.use('/', require('./users/auth.js'));
app.use('/', require('./users/register.js'));
app.use('/', require('./users/users.js'))


MongoClient.connect(url, { useUnifiedTopology: true },async (err, db)=> {
    if (err) {
        console.log('database is not connected')
        console.error(err);
    }
    else {
        console.log('connected!!');
        dbo = await db.db("blogDB");
        app.locals.dbo = dbo;
       await app.listen(3000,  async()=> {
                console.log('Node listen in 3000.')
            });
    }
});

module.exports = app; 