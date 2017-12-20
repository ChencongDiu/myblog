/*
* @Author: x
* @Date:   2017-12-14 19:32:19
* @Last Modified by:   x
* @Last Modified time: 2017-12-20 17:19:13
*/

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))

  // 404 page
app.use(function (req, res) {
  if (!res.headersSent) {
    res.status(404).render('404')
  }
})
}
