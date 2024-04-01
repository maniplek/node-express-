import express from 'express'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const mockUsers = [
  { id: 1, name: 'Wagon', displayName: 'W' },
  { id: 2, name: 'Ben', displayName: 'B' },
  { id: 3, name: 'Cela', displayName: 'C' },
  { id: 4, name: 'Frank', displayName: 'F' },
  { id: 5, name: 'Dan', displayName: 'D' },
  { id: 6, name: 'Melo', displayName: 'M' },
  { id: 7, name: 'Amaly', displayName: 'A' },
  { id: 8, name: 'Harry', displayName: 'H' },
]

// Querry Params filtering
app.get('/api/users', (req, res) => {
  const {
    query: { filter, value },
  } = req
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)))
  return res.send(mockUsers)
})


//route with id parameter
app.get('/api/user/:id', (req, res) => {
  const parsedId = parseInt(req.params.id)
  if (isNaN(parsedId))
    return res.status(401).send({ msg: 'Bad Request , Invalid Id' })
  const findUser = mockUsers.find((user) => user.id === parsedId)
  if (!findUser) res.sendStatus(404)
  return res.status(200).send(findUser)
})


app.post('/api/users', (req, res) => {
  const { body } = req
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
  mockUsers.push(newUser)
  return res.status(201).send(newUser)
})

app.put('/api/user/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)
  // accessing elements in mockUser by their index
  mockUsers[findUserIndex] = { id: parsedId, ...body }
  return res.sendStatus(200)
})

//UPDATING CERTAIN PLACE
app.patch('/api/user/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

app.delete('/api/user/:id', (req, res) => {
  const {
    params: { id },
  } = req
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)
  mockUsers.splice(findUserIndex, 1)
  return res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Running on Port ${PORT}`))
