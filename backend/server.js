import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import workoutRoutes from './routes/workouts.js'
import userRoutes from './routes/user.js'

dotenv.config()

// Initialize app
const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// API routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const frontendPath = path.join(__dirname, '../frontend/build')

  app.use(express.static(frontendPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
  })
}

// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        'Connected to DB & listening on port',
        process.env.PORT || 4000
      )
    })
  })
  .catch((error) => {
    console.error(error)
  })
