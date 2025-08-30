import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import TodoModel from './model/TodoModel'

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.name;
  
  await TodoModel.create(item)

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  
  const item = req.body;
  
  await TodoModel.update(item.id, ({ name: item.name, finishedAt: item.finishedAt }))

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
