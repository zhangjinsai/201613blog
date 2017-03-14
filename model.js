var mongoose = require('mongoose');
var url = require('./config').url;
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(url);
var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
exports.User = mongoose.model('User',UserSchema);

var ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now},
    //ObjectId 对象ID类型，如果这个字段引用的是另外一个集合的主键的话，就是对象ID类型，它是外键。引用的是User模型对应的集合的主键
    author:{type:ObjectId,ref:'User'}
});
exports.Article = mongoose.model('Article',ArticleSchema);