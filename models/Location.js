import mongoose from 'mongoose'

const LocationSchema = new mongoose.Schema({
  code: Number,
  name_en: String,
  name_bn: String,
  type: String
})

export default mongoose.models.Location || mongoose.model('Location', LocationSchema)
