
function logger(req, res, next) {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl || req.url;
        const status = res.statusCode;

        
        let color = "\x1b[32m"; 
        if (status >= 500) color = "\x1b[31m"; 
        else if (status >= 400) color = "\x1b[33m"; 
        else if (status >= 300) color = "\x1b[36m"; 
        const reset = "\x1b[0m";

        console.log(`[\({timestamp}]\){method} \({url} —\){color}\({status}\){reset} (${duration}ms)`);
    });

    next();
}

module.exports = logger;