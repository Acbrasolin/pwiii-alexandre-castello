
const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const genreRoutes = require("./routes/genreRoutes");
const logger = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(logger);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "API de Livraria — PWIII Gabriel Fernandes",
        version: "2.0.0",
        endpoints: {
            books: "/book",
            genres: "/genre"
        }
    });
});


app.use("/book", bookRoutes);
app.use("/genre", genreRoutes);


app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint não encontrado"
    });
});


app.use((err, req, res, next) => {
    console.error("[ERROR]", err.message);
    res.status(500).json({
        message: "Erro interno do servidor"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
});