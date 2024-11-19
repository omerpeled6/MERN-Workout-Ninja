require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB & listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
