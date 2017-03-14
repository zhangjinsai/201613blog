var express = require('express');
var Article = require('../model').Article;
var router = express.Router();
router.get('/add',function(req,res){
    res.render('article/add',{title:'发表文章',article:{}});
});
router.post('/add',function(req,res){
   var article = req.body;
   //!!! 存储的时候存的是就是ID
   article.author = req.session.user._id;
   Article.create(article,function(err,doc){
      if(err){
          req.flash('error','发表文章失败');
          res.redirect('back');
      }else{
          req.flash('success','发表文章成功');
          res.redirect('/');
      }
   })
});
router.get('/detail/:_id',function(req,res){
    //取得路径参数中的_id
  var _id = req.params._id;
  Article.findById(_id,function(err,article){
    res.render('article/detail',{title:'文章详情',article});
  })
});

router.get('/delete/:_id',function(req,res){
   var _id = req.params._id;
   Article.remove({_id},function(err,result){
       if(err){
           req.flash('error','操作失败');
           res.redirect('back');
       }else{
           req.flash('success','删除成功');
           res.redirect('/');
       }
   });
});

router.get('/update/:_id',function(req,res){
    var _id = req.params._id;
    Article.findById(_id,function(err,article){
        res.render('article/add',{title:'修改文章',article});
    })
});
router.post('/update/:_id',function(req,res){
    var _id = req.params._id;
    Article.update({_id},req.body,function(err,doc){
       if(err){
           req.flash('error','修改失败');
           res.redirect('back')
       }else{
           req.flash('success','修改成功');
           res.redirect('/article/detail/'+_id);
       }
    })
});

module.exports = router;