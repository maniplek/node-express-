import express, { request, response } from 'express'
import routes from './routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { mockUsers } from './utils/constants.mjs'
import passport from 'passport'
import './strategies/local-strategy.mjs'

const app = express()

app.use(express.json())
app.use(cookieParser('helloworld'))
app.use(
  session({
    session: 'anson the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.post('api/auth', passport.authenticate('local'), (req, res) => {})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Running on Port ${PORT}`))

// app.get('/', (req, res) => {
//   console.log(req.session)
//   console.log(req.session.id)
//   req.session.visited = true
//   res.cookie('hello', 'world', { maxAge: 30000, signed: true })
//   res.status(201).send({ msg: 'hello' })
// })

// app.post('/api/auth', (request, response) => {
//   const {
//     body: { name, password },
//   } = request
//   const findUser = mockUsers.find((user) => user.name === name)
//   if (!findUser || findUser.password !== password)
//     return response.status(401).send({ msg: 'Bad Credentials' })

//   request.session.user = findUser
//   return response.status(200).send(findUser)
// })

// app.get('/api/auth/status', (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) => {
//     console.log(session)
//   })
//   return request.session.user
//     ? response.status(200).send(request.session.user)
//     : response.status(401).send({ msg: ' Not Authenticated' })
// })

// app.post('/api/cart', (request, response) => {
//   if (!request.session.user) return response.sendStatus(401)
//   const { body: item } = request
//   const { cart } = request.session
//   if (cart) {
//     cart.push(item)
//   } else {
//     request.session.cart = [item]
//   }
//   return response.status(201).send(item)
// })

// app.get('/api/cart', (request, response) => {
//   if (!request.session.user) return response.sendStatus(401)
//   return response.send(request.session.cart ?? []);
// })
