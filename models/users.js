/*
* @Author: x
* @Date:   2017-12-14 21:15:01
* @Last Modified by:   x
* @Last Modified time: 2017-12-14 23:13:54
*/

const User = require('../lib/mongo').User

module.exports = {
  // 注册一个用户
  create: function create (user) {
    return User.create(user).exec()
  },

  // 通过用户名获取用户信息
  getUserByName: function getUserByName (name) {
    return User
      .findOne({ name: name })
      .addCreatedAt()
      .exec()
  }
}
