require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const authRoutes = require('./routes/auth')
const passport = require('./passport')
require('hjs')

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'hjs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'oauth is cool',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).render('403')
  }
  next()
}

app.get('/success', loginRequired, (req, res) => {
  res.render('success')
})

// Useful for debugging the session
app.get('/', (req, res) => {
  res.send({
    session: req.session,
    user: req.user,
    authenticated: req.isAuthenticated(),
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
