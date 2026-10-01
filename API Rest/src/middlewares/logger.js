/**
 * Middleware de logging para Express.
 * Registra informações detalhadas sobre cada requisição HTTP recebida e a respectiva resposta.
 * 
 * @param {import('express').Request} req - Objeto de requisição do Express
 * @param {import('express').Response} res - Objeto de resposta do Express
 * @param {Function} next - Função para passar o controle para o próximo middleware
 */
function logger(req, res, next) {
    // Marca o momento exato (timestamp em milissegundos) em que a requisição chegou
    const start = Date.now();

    // Ouve o evento "finish", que é disparado assim que a resposta é enviada totalmente ao cliente
    res.on("finish", () => {
        // Calcula quanto tempo a requisição levou para ser processada (em milissegundos)
        const duration = Date.now() - start;
        
        // Obtém a data e hora atual no formato ISO (ex: 2026-10-01T...)
        const timestamp = new Date().toISOString();
        
        // Pega o método HTTP utilizado (GET, POST, PUT, DELETE, etc.)
        const method = req.method;
        
        // Obtém a URL acessada (dando preferência à originalUrl completa caso exista)
        const url = req.originalUrl || req.url;
        
        // Pega o código de status HTTP retornado na resposta (ex: 200, 404, 500)
        const status = res.statusCode;

        // Define a cor do texto do status no terminal usando códigos ANSI escape:
        let color = "\x1b[32m"; // Padrão: Verde (Sucesso - códigos 2xx)
        if (status >= 500) color = "\x1b[31m";       // Vermelho (Erros de Servidor - 5xx)
        else if (status >= 400) color = "\x1b[33m";  // Amarelo (Erros do Cliente - 4xx)
        else if (status >= 300) color = "\x1b[36m";  // Ciano (Redirecionamentos - 3xx)
        
        // Código ANSI para resetar a cor do terminal de volta ao padrão
        const reset = "\x1b[0m";

        // Exibe no console a linha formatada com todas as informações coletadas
        console.log(`[\({timestamp}]\){method} \({url} —\){color}\({status}\){reset} (${duration}ms)`);
    });

    // Passa o controle para o próximo middleware ou rota da aplicação
    next();
}

// Exporta o middleware para ser utilizado no server.js (ex: app.use(logger))
module.exports = logger;