const { Schema, model } = require('mongoose')

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    trim: true
  },
  numberClasses: {
    type: Number,
    required: true
  },
  modules: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = model('Course', CourseSchema);