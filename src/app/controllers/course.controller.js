const course = require('./../models/course.model')
const instructor = require('./../models/instructor.model')

class Course {

  criarFilme(req, res) {
    const reqBody = req.body

    course.create(reqBody, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(201).send({ message: 'Successfully created course!', course: data })
      }
    })
  }
  createCourse(req, res) {
    const reqBody = req.body
    const idInstructor = reqBody['instructor']

    course.create(reqBody, (err, course) => {
      if (err) {
        res.status(500).send({ message: "Houve um erro ao processar a sua requisição1", error: err })
      } else {
        instructor.findById(idInstructor, (err, instructor) => {
          if (err) {
            res.status(500).send({ message: "Houve um erro ao processar a sua requisição2", error: err })
          } else {
            instructor.courses.push(course)
            instructor.save({}, (err) => {
              if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição3", error: err })
              } else {
                res.status(201).send({ message: "Filme criado com sucesso", data: course })
              }
            })
          }
        })
      }
    })
  }

  viewAllCourses(req, res) {
    course.find({}, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(200).send({ message: 'Courses successfully recovered', courses: data })
      }
    })
  }

  viewOneCourse(req, res) {
    const name = req.params.name

    course.find({ name: name }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(200).send({ message: `Course ${name} was successfully recovered`, course: data })
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