require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const authRoutes = require('./routes/auth')
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

app.use(authRoutes)

app.get('/success', (req, res) => {
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
  // eslint-disable-next-line
  console.log(`Server is listening on port ${port}`)
})
