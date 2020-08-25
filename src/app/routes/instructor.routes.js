const express = require('express')
const route = express.Router()
const Instructor = require('./../controllers/instructor.controller')

route.post('/create', Instructor.createInstructor)
route.get('/viewAll', Instructor.viewAllInstructor)
route.get('/viewOne/:nameInstructor', Instructor.viewOneInstructorWithCourses)
route.put('/updateOne/:name', Instructor.updateOneInstructor)
route.delete('/deleteOne/:name', Instructor.deleteOneInstructor)

module.exports = route