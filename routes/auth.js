const router = require("express").Router()

router.get("/login", (req, res, next) => {
  res.render("login")
})

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login")
  })
})

module.exports = router
