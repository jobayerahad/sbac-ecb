import mongoose from 'mongoose'

const connection = {}

const dbConnect = async () => {
  if (connection.isConnected) return

  mongoose.set('strictQuery', false)

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
