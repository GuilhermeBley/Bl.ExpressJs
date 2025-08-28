import bodyParser from "body-parser";

const app = express()
const port = 3000

// in memory data store
const books = [];
var lastId = 0

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/book', (req, res) => {
    try {
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: "Error getting data." });
    }
})

app.get('/book/:id', (req, res) => {
    try {
        let id = req.params.id
        let result = books.find(p => p.id === parseInt(id))
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Error getting data." });
    }
})

app.post('/book', (req, res) => {
    try {
        let currentId = lastId
        lastId++

        let obj = {
            id: currentId,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: new Date()
        };
        books.push(obj)
        res.json(obj)
    } catch (error) {
        res.status(500).json({ message: "Error creating data." });
    }
})

app.delete('/book/:id', (req, res) => {
    try {
        let id = req.params.id
        let idx = books.findIndex(p => p.id === parseInt(id))

        if (idx === -1) return res.status(404)
        books.splice(idx, 1)
        res.json({ message: "Item sucessfully removed." })
    } catch (error) {
        res.status(500).json({ message: "Error deleting data." });
    }
})

app.patch('/book/:id', (req, res) => {
    try {
        let id = req.params.id
        let result = books.find(p => p.id === parseInt(id))

        if (!result) return res.status(404)

        result.title= req.body.title;
        result.content= req.body.content;
        result.author= req.body.author;

        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Error updating data." });
    }
})

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("views/index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})