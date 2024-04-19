import passport from 'passport'
import { Strategy } from 'passport-local'
import { mockUsers } from '../utils/constants.mjs'

export default passport.use(
  new Strategy((name, password, done) => {
    console.log(`username: ${name}`)
    console.log(`Password ${password}`)
    try {
      const findUser = mockUsers.find((user) => user.name === name)
      if (!findUser) throw new Error('user not found')
      if (findUser.password !== passport) throw new Error('Invalid credentials')
      done(null, findUser)
    } catch (err) {
      done(err, null)
    }
  }),
)
