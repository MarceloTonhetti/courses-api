const { Schema, model } = require('mongoose')

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  descrition: {
    type: String,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    trim: true
  },
  amountClasses: {
    type: Number,
    required: true
  },
  modules: {
    type: String,
    trim: true
  },
  photo: {
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