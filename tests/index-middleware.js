import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express()
const port = 3001
const __dir = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true })) // here we're using a middleware to convert form-url-encoded

app.use((req, res, next) =>{ // adding our own middleware
    if (req.url == "/login") next();

    console.log(`User auth: ${req.headers.authorization}`) // logging authorization header field
    next()
})

app.get('/', (req, res) => {
  res.sendFile(__dir + "/public/index.html")
})

app.post('/login', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})