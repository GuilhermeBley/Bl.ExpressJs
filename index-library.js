import bodyParser from "body-parser";

const app = express()
const port = 3000

// in memory data store
const books = [];
var lastId = 0

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/book', (req, res) => {
    return res.json(books)
})

app.get('/book/:id', (req, res) => {
    let id = req.params.id
    let result = books.find(p => p.id === parseInt(id))
    return res.json(result)
})

app.post('/book', (req, res) => {
    let currentId = lastId
    lastId++

    let obj = {
        id: currentId,
        name: req.body.name,
        description: req.body.description,
        author: req.body.author
    };
    books.push(obj)
    return res.json(obj)
})

app.delete('/book/:id', (req, res) => {
    let id = req.params.id
    let idx = books.findIndex(p => p.id === parseInt(id))

    if (idx === -1) return res.status(404)
    books.splice(idx, 1)
    return res.json({ message: "Item sucessfully removed." })
})

app.patch('/book/:id', (req, res) => {
    let id = req.params.id
    let result = books.find(p => p.id === parseInt(id))

    if (!result) return res.status(404)

    result.name = req.body.name
    result.description = req.body.description
    result.author = req.body.author

    return res.json(result)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})