/*
* @Author: x
* @Date:   2017-12-14 20:05:28
* @Last Modified by:   x
* @Last Modified time: 2017-12-14 21:26:33
*/
'use strict'

const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signup')
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const gender = req.fields.gender
  const bio = req.fields.bio
  const avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  const repassword = req.fields.repassword

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('name should be consisted by 1 - 10 characters')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('gender should be male, female, or other')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('personal information should be consisted by 1 - 30 characters')
    }
    if (!req.files.avatar.name) {
      throw new Error('please provide an icon')
    }
    if (password.length < 6) {
      throw new Error('password should be at least 6 characters')
    }
    if (password !== repassword) {
      throw new Error('re-enter password incorrect!')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }

  // 明文密码加密
  password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  // 用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      // 删除密码这种敏感信息，将用户信息存入 session
      delete user.password
      req.session.user = user
      // 写入 flash
      req.flash('success', 'Sign Up Succeeded')
      // 跳转到首页
      res.redirect('/posts')
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        req.flash('error', 'username is already taken, please try another one')
        return res.redirect('/signup')
      }
      next(e)
    })
})

module.exports = router
