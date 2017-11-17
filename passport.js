const db = require('./db')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
  },
  ((accessToken, refreshToken, profile, done) => {
    db
      .getOauthUser('github', profile.username)
      .then((user) => {
        if (user) {
          return done(null, user)
        }
        const newUser = {
          oauth_provider: 'github',
          oauth_id: profile.username,
        }

        return db.createOauthUser(newUser).then((createdUser) => {
          done(null, createdUser)
        })
      })
      .catch((err) => {
        console.log('OAuth Error: ', err)
        done(err)
      })
  }),
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  db
    .getUserById(id)
    .then((user) => {
      done(null, user)
    })
    .catch(done)
})

module.exports = passport
