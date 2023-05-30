const express = require('express')

const { programacion } = require('../datos/cursos').infoCursos

const routerProgramacion = express.Router()

// Middleware -> se ejecutan después de la solicitud y antes de enviar la respuesta
routerProgramacion.use(express.json()) // convirtiendo el cuerpo de la solicitud a JSON.

// GET

// General
routerProgramacion.get('/', (req, res) => {
  if (req.query.ordenar === 'vistas') {
    return res.json(programacion.sort((a, b) => b.vistas - a.vistas))
  }
  res.json(programacion)
})

// Lenguaje
routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje)

  if (resultados.length === 0) {
    return res.status(204).json(`No se encontraron cursos de ${lenguaje}.`)
  }
  res.json(resultados)
})

// Nivel
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje
  const nivel = req.params.nivel
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)

  if (resultados.length === 0) {
    return res.status(204).json(`No se encontraron cursos de ${lenguaje} nivel ${nivel}.`)
    // return res.status(204).end() // enviar respuesta vacía
  }

  res.json(resultados)
})

// POST

routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body
  programacion.push(cursoNuevo)
  res.json(programacion)
})

//  PUT -> reemplaza toda la entidad

routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body
  const id = req.params.id

  const indice = programacion.findIndex(curso => curso.id == id)

  if (indice >= 0) {
    programacion[indice] = cursoActualizado
  } else {
    return res.status(204).json(`El id: ${id} no existe.`)
  }
  res.json(programacion)
})

// PATCH -> se actualiza una parte de la entidad

routerProgramacion.patch('/:id', (req, res) => {
  const infoActualizada = req.body
  const id = req.params.id

  const indice = programacion.findIndex(curso => curso.id == id)

  if (indice >= 0) {
    const cursoAModificar = programacion[indice]
    Object.assign(cursoAModificar, infoActualizada)
  } else {
    return res.status(204).json(`El id: ${id} no existe.`)
  }
  res.json(programacion)
})

// DELETE

routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id
  const indice = programacion.findIndex(curso => curso.id == id)

  if (indice >= 0) {
    programacion.splice(indice, 1)
  } else {
    return res.status(204).json(`El id: ${id} no existe.`)
  }
  res.json(programacion)
})

module.exports = routerProgramacion