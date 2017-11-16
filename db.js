const store = {
  users: [
    {
      id: 1,
      email: 'test@test.com',
      password: '123',
      name: 'User1',
      oauth_provider: null,
      oauth_id: null,
    },
  ],
  userIdNext: 2,
  contacts: [{ id: 1, name: 'Justin' }, { id: 2, name: 'Judy' }, { id: 3, name: 'NeEddra' }],
  contactsIdNext: 4,
}

// oneOrNone
function getUserById(id) {
  let result = null
  store.users.forEach((user) => {
    if (user.id === id) {
      result = user
    }
  })
  return Promise.resolve(result)
}

// oneOrNone
function getOauthUser(provider, providerId) {
  let result = null
  store.users.forEach((user) => {
    if (user.oauth_provider === provider && user.oauth_id === providerId) {
      result = user
    }
  })
  return Promise.resolve(result)
}

// oneOrNone, RETURNING *
// NOTE: does NOT check if the user is already in the db
function createOauthUser(user) {
  const newUserId = store.userIdNext
  const newUser = {
    id: newUserId,
    email: null,
    password: null,
    name: null,
    oauth_provider: user.oauth_provider,
    oauth_id: user.oauth_id,
  }
  store.users.push(newUser)
  store.userIdNext += 1
  console.log('[DEBUG] DB store: ', store)
  return Promise.resolve(newUser)
}

module.exports = {
  getUserById,
  getOauthUser,
  createOauthUser,
}
