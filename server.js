const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();
const methodOverride = require("method-override");

//banquinho de dados
mongoose
  .connect("mongodb://127.0.0.1:27017/Vet1", {})
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
//paginas onde os ejs(views) estão e vão ser renderizados
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", routes); //rotas ae

app.listen(3000, () => {
  console.log("Acessar http://localhost:3000");
});
