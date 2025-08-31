import express from "express";
import bodyParser from "body-parser";
import TodoModel from "./model/TodoModel.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
  console.log(`Connected to PostgreSQL database. Connection: ${process.env.DATABASE_URL}`);

TodoModel.tryCreateTable();

app.get("/", (req, res) => {
  const items = []

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.title;
  
  await TodoModel.create(item)

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  
  const item = req.body;
  
  await TodoModel.update(item.id, ({ title: item.title, finishedAt: item.finishedAt }))

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  
  const item = req.body;
  
  await TodoModel.delete(item.id)

  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
