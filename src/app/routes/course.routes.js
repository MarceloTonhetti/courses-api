const express = require('express')
const route = express.Router()
const Course = require('./../controllers/course.controller')

route.post('/create', Course.createCourse)
route.get('/viewAll', Course.viewAllCourses)
route.get('/viewOne/:nameCourse', Course.viewOneCourse)
route.get('/validadeCourseName', Course.validateCourseName)
route.put('/update/:courseId', Course.updateCourse)
route.delete('/delete/:courseId', Course.deleteCourse)

module.exports = route