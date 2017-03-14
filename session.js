var express = require('express');
var app = express();
var session = require('express-session');
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));
app.get('/visit',function(req,res){
    var balance = req.session.balance;
    if(balance == undefined){
        req.session.balance = 100;
        res.send('欢迎你首次光临,送你100块');
    }else{
        req.session.balance -=10;
        res.send('欢迎你再次光临,你的余额还有'+req.session.balance);
    }
});
app.listen(8080);