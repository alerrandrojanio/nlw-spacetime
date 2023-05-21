import "dotenv/config"

import fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import multipart from "@fastify/multipart"
import { memoriesRoutes } from "./routes/memories"
import { authRoutes } from "./routes/auth"
import { uploadRoutes } from "./routes/upload"
import { resolve } from "path"

const port = 3333
const host = "0.0.0.0"

const app = fastify()

app.register(multipart)

app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: "spacetime",
})

app.register(uploadRoutes)
app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(`🚀 Server is running on port ${port}`)
  })
