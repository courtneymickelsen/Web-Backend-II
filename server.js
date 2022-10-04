const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err){
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    }
})
