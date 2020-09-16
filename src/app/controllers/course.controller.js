const course = require('./../models/course.model')
const instructor = require('./../models/instructor.model')

class Course {

  createCourse(req, res) {
    const reqBody = req.body
    const idInstructor = reqBody['instructor']

    course.create(reqBody, (err, course) => {
      if (err) {
        res.status(500).send({ message: "Error processing your request", error: err })
      } else {
        instructor.findById(idInstructor, (err, instructor) => {
          if (err) {
            res.status(500).send({ message: "Error processing your request", error: err })
          } else {
            instructor.courses.push(course)
            instructor.save({}, (err) => {
              if (err) {
                res.status(500).send({ message: "Error processing your request", error: err })
              } else {
                res.status(201).send({ message: "Successfully created course!", data: course })
              }
            })
          }
        })
      }
    })
  }

  viewAllCourses(req, res) {
    course.find({})
      .populate('instructor', { name: 1, image: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: 'Error processing your request', error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({ message: 'There are no courses registered in the database' })
          } else {
            res.status(200).send({ message: 'Courses successfully recovered', courses: data })
          }
        }
      })
  }

  viewOneCourse(req, res) {
    const { nameCourse } = req.params

    if (nameCourse == undefined || nameCourse == 'null') {
      res.status(400).send({ message: "The name of the course must be filled in" })
    }

    course.findOne({ name: nameCourse })
      .populate('instructor', { name: 1, image: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Error processing your request", error: err })
        } else {
          if (data == null) {
            res.status(200).send({ message: `Course not found in the database` })
          } else {
            res.status(200).send({ message: `Course ${nameCourse} was successfully recovered`, data: data })
          }
        }
      })
  }

  updateOneCourse(req, res) {
    const oldName = req.params.name
    const newName = req.body.name

    course.updateOne({ name: oldName }, { $set: req.body }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your update', error: err })
      } else {
        if (data.n > 0) {
          course.findOne({ name: newName }, (error, result) => {
            if (error) {
              res.status(500).send({ message: 'Error processing your search in course updated', error: error })
            } else {
              res.status(200).send({ message: `Course ${oldName} was successfully updated to ${newName}`, course: result })
            }
          })
        }
      }
    })
  }

  deleteOneCourse(req, res) {
    const nameDelete = req.params.name

    course.deleteOne({ name: nameDelete }, (err) => {
      if (err) {
        res.status(500).send({ message: `Error processing your deletion`, error: err })
      } else {
        res.status(200).send({ message: `Course ${nameDelete} successfully deleted` })
      }
    })
  }

}
module.exports = new Course()