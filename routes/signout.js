/*
* @Author: x
* @Date:   2017-12-14 20:05:58
* @Last Modified by:   x
* @Last Modified time: 2017-12-14 23:10:18
*/

const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
  // 清空 session 中用户信息
  req.session.user = null
  req.flash('success', 'Sign Out Succeeded')
  // 登出成功后跳转到主页
  res.redirect('/posts')
})

module.exports = router
