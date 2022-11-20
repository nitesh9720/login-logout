const express = require("express");
const app = express();
const path=require('path')
const session = require('express-session')
var flash = require('connect-flash');
app.use(flash());
app.use(session({
    secret: 'nietdjeoeidgddergtgsfchbr6hg',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  }))

app.use('/',require('./route'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./views'))

app.listen(3000, function () {
  console.log("app is running");
});
