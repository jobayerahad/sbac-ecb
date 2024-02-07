import mongoose from 'mongoose'

export const connectToDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true)

  if (mongoose.connection.readyState === 1) return

  try {
    await mongoose.connect(process.env.DB_URI!, {
      dbName: process.env.DB_NAME!
    })
  } catch (error: any) {
    throw error
  }
}
