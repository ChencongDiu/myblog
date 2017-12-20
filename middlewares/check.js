/*
* @Author: x
* @Date:   2017-12-14 19:57:02
* @Last Modified by:   x
* @Last Modified time: 2017-12-14 20:22:28
*/

module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not Sign In')
      return res.redirect('/signin')
    }
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', 'Sign In')
      return res.redirect('back')// back to previous page
    }
    next()
  }
}
