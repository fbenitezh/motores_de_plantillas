const express = require("express");
const app = express();
const PORT = 8080;
const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("./src/productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("nuevoProducto");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  res.render("productos", {
    productos,
  });
});

app.post("/productos", async (req, res) => {
  const { body } = req;
  try {
      await contenedor.save(body);
      res.redirect("/");
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
