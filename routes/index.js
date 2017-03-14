var express = require('express');
var router = express.Router();
var Article = require('../model').Article;
router.get('/',function(req,res){
    var keyword = req.query.keyword;
    //query是查询的条件对象
    var query = {};
    //如果关键字有值的话
    if(keyword){
        //给title赋值等于一个正则表达式
        query.title = new RegExp(keyword);
    }
    //populate就是填充的意思，把一个对象ID类型的字符串转成对应的真正的对象 article.author就从字符串变成了用户对象
    Article.find(query).populate('author').exec(function(err,articles){
        res.render('index',{title:'首页',articles,keyword});
    });
});
module.exports = router;