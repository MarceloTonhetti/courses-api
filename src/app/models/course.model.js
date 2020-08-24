const { Schema, model } = require('mongoose')

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  descrition: {
    type: String,
    required: false,
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
    required: false,
    trim: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = model('courseschema', CourseSchema);