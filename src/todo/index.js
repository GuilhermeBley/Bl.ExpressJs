import express from "express";
import bodyParser from "body-parser";
import TodoModel from "./model/TodoModel.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
  console.log(`Connected to PostgreSQL database. Connection: ${process.env.DATABASE_URL}`);

TodoModel.tryCreateTable();

app.get("/", async (req, res) => {
  let items = []

  try
  {
    items = await TodoModel.getAll();
  }catch(e){
    console.log('Failed to get all items.', e)
  }

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  
  try {
    console.log(`Trying to proccess body: ${JSON.stringify(req.body)}`)
    await TodoModel.create(item)
  }
  catch(e) {
    console.log('Failed to add item.', e)
  }

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  
  const item = req.body;

  try {
    console.log(`Trying to proccess body: ${JSON.stringify(req.body)}`)
    await TodoModel.update(item.updatedItemId, ({ title: item.updatedItemTitle, finishedAt: item.finishedAt }))
  }
  catch(e) {
    console.log('Failed to update item.', e)
  }

  res.redirect("/");

});

app.post("/delete", async (req, res) => {
  
  const item = req.body;
  
  try {
    console.log(`Trying to proccess body: ${JSON.stringify(req.body)}`)
    await TodoModel.delete(item.deleteItemId)
  }
  catch(e) {
    console.log('Failed to delete item.', e)
  }


  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
