import express, { json, request, response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const PORT = 3005
const app = express()

app.use(cors())
app.use(express.json())

// ----------- POST -----------

app.post("/usuarios", async (request, response) => {

  await prisma.usuario.create({
    data: {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age
    }
  })

  response.status(201).send(request.body)
})

// ------------ GET --------------------

app.get("/usuarios", async (request, response) => {

  let usuarios = []

  if (request.query) {
    usuarios = await prisma.usuario.findMany({
      where: {
        name: request.query.name,
        age: request.query.age,
        email: request.query.email
      }
    })

  } else {
    usuarios = await prisma.usuario.findMany()
  }


  response.status(200).json(usuarios)
})

// --------------- PUT ----------------

app.put("/usuarios/:id", async (request, response) => {

  await prisma.usuario.update({
    where: {
      id: request.params.id
    },

    data: {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age
    }
  })

  response.status(201).json({ message: "Dados atualizados!" })
})

// ---------------- DELETE ---------------

app.delete("/usuarios/:id", async (request, response) => {
  await prisma.usuario.delete({
    where: {
      id: request.params.id
    }
  })

  response.status(200).json({ message: "Usuário deletado com sucesso!" })
})

app.listen(PORT, () => { console.log('Servidor rodando na porta ' + PORT) })