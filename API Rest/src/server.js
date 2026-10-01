/**
 * @file server.js
 * @description Ponto de entrada principal da aplicação Express da Livraria.
 * Configura middlewares, rotas, tratamento de erros e inicia o servidor HTTP.
 */

const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const genreRoutes = require("./routes/genreRoutes");
const logger = require("./middlewares/logger");

// Inicializa a aplicação Express
const app = express();

// Define a porta do servidor (utiliza a variável de ambiente PORT ou cai para o padrão 3000)
const PORT = process.env.PORT || 3000;


// --- MIDDLEWARES GLOBAIS ---

// Middleware para interpretar o corpo das requisições no formato JSON
app.use(express.json());

// Middleware customizado para registrar logs detalhadas de cada requisição no console
app.use(logger);


// --- ROTAS DA API ---

// Rota raiz (Home) para verificação de status e documentação básica da API
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

// Associa as rotas de livros ao prefixo /book
app.use("/book", bookRoutes);

// Associa as rotas de gêneros ao prefixo /genre
app.use("/genre", genreRoutes);


// --- TRATAMENTO DE ERROS E EXCEÇÕES ---

// Middleware para capturar rotas não encontradas (Erro 404)
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint não encontrado"
    });
});

// Middleware global de tratamento de erros internos (Erro 500)
app.use((err, req, res, next) => {
    console.error("[ERROR]", err.message);
    res.status(500).json({
        message: "Erro interno do servidor"
    });
});


// --- INICIALIZAÇÃO DO SERVIDOR ---

// Coloca o servidor para escutar na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
});