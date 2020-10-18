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
            res.status(200).send({ message: 'Courses successfully recovered', data: data })
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

  updateCourse(req, res) {
    const { courseId } = req.params
    const reqBody = req.body
    const instructorId = reqBody['instructor']

    course.updateOne({ _id: courseId }, { $set: reqBody }, (err, course) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request'})
      } else {
        instructor.findOne({ courses: courseId}, (err, result) => {
          if (err) {
            res.status(500).send({ message: 'Error processing your request'})
          } else {
            if(result['_id'] == instructorId) {
              res.status(200).send({ message: `Course was successfully updated`, data: course})
            } else {
              result.courses.pull(courseId)
              result.save({}, (err) => {
                if(err){
                  res.status(500).send({ message: 'Error processing your request'})
                } else {
                  instructor.findById(instructorId, (err, instructor) => {
                    if(err){
                      res.status(500).send({ message: 'Error processing your request' })
                    } else {
                      instructor.courses.push(courseId)
                      instructor.save({}, (err) => {
                        if(err) {
                          res.status(500).send({ message: 'Error processing your request' })
                        } else {
                          res.status(200).send({ message: `Course was successfully updated`, data: course })
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }

  deleteCourse(req, res) {
    const { courseId } = req.params

    instructor.findOne({ courses: courseId }, (err, instructor) => {
      if(err){
        res.status(500).send({ message: 'Error processing your request' })
      } else {
        instructor.courses.pull(courseId)
        instructor.save((err) => {
          if(err){
            res.status(500).send({ message: 'Error processing your request' })
          } else {
            course.deleteOne({ _id: courseId }, (err, result) => {
              if (err) {
                res.status(500).send({ message: 'Error processing your request' })
              } else {
                res.status(200).send({ message: `Course successfully deleted`, data: result })
              }
            })
          }
        })
      }
    })
  }

  validateCourseName(req, res) {
    const name = req.query.name.replace(/%20/g, " ")

    course.find({ name: { '$regex': `^${name}$`, '$options': 'i' } }, (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        if (result.length > 0) {
          res.status(200).send({ message: 'There is already a registered course with that name', data: result.length })
        } else {
          res.status(200).send({ message: 'Course available', data: result.length })
        }
      }
    })
  }

}
module.exports = new Course()