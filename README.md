#珠峰博客
珠峰博客是一个集注册、登录、上传头象、发表文章、退出、查看文章列表、分页、查询、评论等功能的博客

# 初始化
1. 创建项目
```
npm init -y
```

2.安装依赖的模块
```
npm install express bootstrap jquery body-parser express-session multer connect-flash connect-mongo morgan debug mongoose --save
```

# 配置路由
用户相关
```
/user/signup 注册
/user/signin 登录
/user/signout 退出
```
文章类
```
/article/add 增加文章
/article/list 查看文章列表
```



