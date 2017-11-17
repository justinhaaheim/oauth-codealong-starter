const router = require("express").Router()
const passport = require('../passport')

router.get("/login", (req, res, next) => {
  res.render("login")
})

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login")
  })
})

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email'] }))

router.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/success',
  failureRedirect: '/login'
}))

module.exports = router
