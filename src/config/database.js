const mongoose = require('mongoose')
require('dotenv').config()
let db = null
const URI_DATABASE = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

db = mongoose.connect(URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch(error => console.log(`Problema ao conectar ao banco de dados = ERRO: ${error}`))

module.exports = { db }