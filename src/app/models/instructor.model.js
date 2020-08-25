const { Schema, model } = require('mongoose')

const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    trim: true
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]

},
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Instructor', InstructorSchema);