const instructor = require('./../models/instructor.model')
const course = require('./../models/course.model')

class Instructor {

  createInstructor(req, res) {
    const reqBody = req.body

    instructor.create(reqBody, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(201).send({ message: 'Successfully created instructor!', data: data })
      }
    })
  }

  viewAllInstructor(req, res) {
    instructor.find({}, { courses: 0 })
      .sort({ name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Error processing your request", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({ message: "No instructors were found in the database" })
          } else {
            res.status(200).send({ message: "Successfully recovered all instructors!", data: data })
          }
        }
      })
  }

  updateInstructor(req, res) {
    const { instructorId } = req.params
    const reqBody = req.body

    instructor.updateOne({ _id: instructorId }, { $set: reqBody }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your updated', error: err })
      } else {
        res.status(200).send({ message: `Instructor was successfully update`, data: data })
      }
    })
  }

  deleteInstructor(req, res) {
    const { instructorId } = req.params

    course.deleteOne({ instructor: instructorId }, (err) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request' })
      } else {
        instructor.deleteOne({ _id: instructorId }, (err, result) => {
          if (err) {
            res.status(500).send({ message: 'Error processing your deletion', error: err })
          } else {
            res.status(200).send({ message: `Instructor successfully deleted`, data: result})
          }
        })
      }
    })
  }

  viewOneInstructorWithCourses(req, res) {
    const { nameInstructor } = req.params

    if (nameInstructor == undefined || nameInstructor == 'null') {
      res.status(400).send({ message: "The name of the instructor must be filled in" })
    }

    instructor.findOne({ name: nameInstructor })
      .populate('courses', { name: 1, image: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Error processing your request", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({ message: `Instructor ${nameInstructor} does not exist in the database` })
          } else {
            res.status(200).send({ message: `Instructor ${nameInstructor} successfully recovered`, data: data })
          }
        }
      })
  }

  validateInstructorName(req, res) {
    const name = req.query.name.replace(/%20/g, " ")

    instructor.find({ name: { '$regex': `^${name}$`, '$options': 'i' } }, (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        if (result.length > 0) {
          res.status(200).send({ message: 'There is already a registered instructor with that name', data: result.length })
        } else {
          res.status(200).send({ message: 'Instructor available', data: result.length })
        }
      }
    })
  }

}

module.exports = new Instructor()