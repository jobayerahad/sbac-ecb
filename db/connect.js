import mongoose from 'mongoose'

const connect = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  return { mongoose }
}

export default connect
