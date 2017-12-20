/*
* @Author: x
* @Date:   2017-12-14 19:47:55
* @Last Modified by:   x
* @Last Modified time: 2017-12-14 19:48:02
*/

module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
