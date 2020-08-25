const instructor = require('./../models/instructor.model')

class Instructor {

  createInstructor(req, res) {
    const reqBody = req.body

    instructor.create(reqBody, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(201).send({ message: 'Successfully created instructor!', instructor: data })
      }
    })
  }

  viewAllInstructor(req, res) {

    instructor.find({}, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(200).send({ message: 'Instructors successfully recovered!', instructors: data })
      }
    })


    /**instructor.find({}, { courses: 0 })
      .sort({ name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({ message: "Não foram escontrados instrutores para exibir" })
          } else {
            res.status(200).send({ message: "Instrutores recuperados com sucesso", data: data })
          }
        }
      })*/
  }

  viewOneInstructor(req, res) {
    const name = req.params.name

    instructor.findOne({ name: name }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error processing your request', error: err })
      } else {
        res.status(200).send({ message: `Instructor ${name} was successfully recovered!`, instructor: data })
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

  /**buscarOsCursosDoInstrutor(req, res) {
    const { nameInstructor } = req.params

    if (nameInstructor == undefined || nameInstructor == 'null') {
      res.status(400).send({ message: "O nome do instrutor deve ser obrigatoriamente preenchido" })
    }

    instructor.findOne({ name: nameInstructor })
      .populate('courses', { name: 1, photo: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({ message: `O instructor ${nameInstructor} não existe no banco de dados` })
          } else if (data['couses'].length <= 0 || data == null) {
            res.status(200).send({ message: `O instructor ${nameInstructor} não possuie cursos cadastrados` })
          } else {
            res.status(200).send({ message: `O instructor ${nameInstructor} foi recuperado com sucesso`, data: data })
          }
        }
      })
  }*/



}

module.exports = new Instructor()