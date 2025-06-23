const express = require("express");
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Parse form data and serve static files (like CSS)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory task list
let items = [];

// Home Route - Show Todo List
app.get("/", (req, res) => {
  res.render("list", { ejes: items });
});

// Add Task
app.post("/", (req, res) => {
  const itemText = req.body.ele1.trim();
  if (itemText !== "") {
    items.push({ text: itemText, done: false });
  }
  res.redirect("/");
});

// Toggle Task Completion
app.post("/toggle", (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) {
    items[index].done = !items[index].done;
  }
  res.redirect("/");
});

// Delete Task
app.post("/delete", (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) {
    items.splice(index, 1);
  }
  res.redirect("/");
});

// Edit Task
app.post("/edit", (req, res) => {
  const index = parseInt(req.body.index);
  const newText = req.body.newText.trim();
  if (!isNaN(index) && newText !== "") {
    items[index].text = newText;
  }
  res.redirect("/");
});

// Start the server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
