const instructor = require('./../models/instructor.model')

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

  updateOneInstructor(req, res) {
    const oldName = req.params.name
    const newName = req.body.name

    instructor.updateOne({ name: oldName }, { $set: req.body }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your updated', error: err })
      } else {
        if (data.n > 0) {
          instructor.findOne({ name: newName }, (error, result) => {
            if (error) {
              res.status(500).send({ message: 'Error processing your search in instructor updated', error: error })
            } else {
              res.status(200).send({ message: `Instructor ${oldName} was successfully update to ${newName}`, instructor: result })
            }
          })
        }
      }
    })
  }

  deleteOneInstructor(req, res) {
    const nameDelete = req.params.name

    instructor.deleteOne({ name: nameDelete }, (err) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your deletion', error: err })
      } else {
        res.status(200).send({ message: `Instructor ${nameDelete} successfully deleted` })
      }
    })
  }

  viewOneInstructorWithCourses(req, res) {
    const { nameInstructor } = req.params

    if (nameInstructor == undefined || nameInstructor == 'null') {
      res.status(400).send({ message: "The name of the instructor must be filled in" })
    }

    instructor.find({ name: nameInstructor })
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
    const name = res.query.name.replace(/%20/g, " ")

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