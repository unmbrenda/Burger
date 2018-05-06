const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


const routes = require('./controllers/burgers_controller');
app.use(routes);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({error: "failed to process request."});
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
