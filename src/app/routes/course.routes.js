const express = require('express')
const route = express.Router()
const Course = require('./../controllers/course.controller')

route.post('/create', Course.createCourse)
route.get('/viewAll', Course.viewAllCourses)
route.get('/viewOne/:nameCourse', Course.viewOneCourse)
route.put('/updateOne/:name', Course.updateOneCourse)
route.delete('/deleteOne/:name', Course.deleteOneCourse)

module.exports = route