var express = require('express');
var User = require('../model').User;
//先引用multer中间件
var multer = require('multer');
//指定上传路径，也就是说上传的文件放在哪个路径下面
var upload = multer({dest:'./public/uploads'});
var router = express.Router();
router.get('/signup',function(req,res){
    //给模板变量的赋值有两种方法，第一方法是写在render的第二个参数中
    // 第二种方法是给res.locals赋值
    //真正渲染模板的对象是res.locals,render的时候会把数据对象的属性拷贝到res.locals对象上，然后用res.locals来进行渲染
    res.render('user/signup',{title:'注册'});
});
//在路由中使用中间件
//avatar是上传的表单的文件字段的name属性 single表示上传的表单只有一个文件字段
router.post('/signup',upload.single('avatar'),function(req,res){
    var user = req.body;
    user.avatar = `/uploads/${req.file.filename}`;
    User.create(user,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/user/signin');
        }
    })
});
router.get('/signin',function(req,res){
    res.render('user/signin',{title:'登录'});
});
router.post('/signin',function(req,res){
    var user = req.body;
    User.findOne(user,function(err,doc){
        //如果没查到也是成功，只有数据库操作失败才有错误 err不为null
        if(err){
            //给error类型的增加消息
            req.flash('error','登录失败');
            //如果只传入消息的类型，那么表示把写入的消息取出来
            //req.flash('error');
            res.redirect('back');
        }else{
            //如果成功了，doc可能是null,也可能是一个对象
            if(doc){
                req.flash('success','登录成功');
                req.session.user = doc;
                res.redirect('/');
            }else{
                req.flash('error','登录失败');
                res.redirect('back');
            }
        }
    })
});
router.get('/signout',function(req,res){
    req.session.user = null;
    res.redirect('/');
});
module.exports = router;

/**
 * { fieldname: 'avatar', 前台form表单中的字段名
     originalname: 'sjz.png', 上传文件的原始名称
     encoding: '7bit',
     mimetype: 'image/png',内容类型
     destination: './public/uploads',
     filename: 'ba5fd34bb72470b563b1284beb6a2937',
     path: 'public\\uploads\\ba5fd34bb72470b563b1284beb6a2937',
     size: 57096 }
 **/