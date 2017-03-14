var express = require('express');
var path = require('path')
var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var bodyParser = require('body-parser');
var session = require('express-session');
//mongostore可以把会话信息放在数据库里
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
//调用express方法返回app
var app = express();
//设置模板引擎 模板的文件后缀
app.set('view engine','html');
//设置模板的存放目录
app.set('views',path.resolve('views'));
//针对HTML类型的模板，如何进行渲染
app.engine('html',require('ejs').__express);
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
//当客户端发过来的URL路径前缀是/user的时候，交由user中间件来处理
app.use(bodyParser.urlencoded({extended:true}));
var url = require('./config').url;
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx',
    //指定会话的存储位置
    store: new MongoStore({
        url
    })
}));
// req.flash('消息的类型','消息的内容');
app.use(flash());
app.use(function(req,res,next){
    //把写入flash消息取出来赋给res.locals对象，那么就可以在模板中使用了
    res.locals.success = req.flash('success').toString();
    //flash里的消息一旦取值就立刻销毁
    res.locals.error = req.flash('error').toString();
    res.locals.user = req.session.user;
    res.locals.keyword = '';
    next();
});
app.use('/',index);
app.use('/user',user);
app.use('/article',article);

app.listen(8080);
