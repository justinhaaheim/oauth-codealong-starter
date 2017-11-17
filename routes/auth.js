const router = require('express').Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // eslint-disable-next-line
      console.log('Error destroying session:', err)
    }
    res.redirect('/login')
  })
})

module.exports = router
