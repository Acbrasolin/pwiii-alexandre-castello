/**
 * @file product.service.js
 * @description Camada de serviço responsável pela gestão de livros (produtos),
 * incluindo armazenamento em memória, consultas com filtros, paginação, CRUD e estatísticas.
 */

// Banco de dados simulado em memória com uma lista inicial de livros
let books = [
    {
        id: 1,
        title: "O Senhor dos Anéis",
        description: "Edição especial com trilogia completa e capa dura",
        price: 150.00,
        quantity: 12,
        genre: "Fantasia",
        author: "J.R.R. Tolkien",
        createdAt: new Date("2025-01-10").toISOString(),
        updatedAt: new Date("2025-01-10").toISOString()
    },
    {
        id: 2,
        title: "Clean Code",
        description: "Habilidades práticas do Agile Software",
        price: 89.90,
        quantity: 25,
        genre: "Tecnologia",
        author: "Robert C. Martin",
        createdAt: new Date("2025-01-12").toISOString(),
        updatedAt: new Date("2025-01-12").toISOString()
    },
    {
        id: 3,
        title: "1984",
        description: "Romance distópico sobre vigilância em massa",
        price: 49.90,
        quantity: 18,
        genre: "Ficção Científica",
        author: "George Orwell",
        createdAt: new Date("2025-02-05").toISOString(),
        updatedAt: new Date("2025-02-05").toISOString()
    },
    {
        id: 4,
        title: "O Pequeno Príncipe",
        description: "Clássico da literatura mundial ilustrado",
        price: 35.00,
        quantity: 30,
        genre: "Infantil",
        author: "Antoine de Saint-Exupéry",
        createdAt: new Date("2025-03-01").toISOString(),
        updatedAt: new Date("2025-03-01").toISOString()
    },
    {
        id: 5,
        title: "Sapiens: Uma Breve História da Humanidade",
        description: "Da Idade da Pedra ao Vale do Silício",
        price: 65.00,
        quantity: 10,
        genre: "História",
        author: "Yuval Noah Harari",
        createdAt: new Date("2025-03-15").toISOString(),
        updatedAt: new Date("2025-03-15").toISOString()
    },
    {
        id: 6,
        title: "Design Patterns",
        description: "Elementos de Software Reutilizável Orientado a Objetos",
        price: 120.00,
        quantity: 8,
        genre: "Tecnologia",
        author: "Erich Gamma",
        createdAt: new Date("2025-04-02").toISOString(),
        updatedAt: new Date("2025-04-02").toISOString()
    },
    {
        id: 7,
        title: "Duna",
        description: "A clássica saga de ficção científica no planeta Arrakis",
        price: 89.90,
        quantity: 14,
        genre: "Ficção Científica",
        author: "Frank Herbert",
        createdAt: new Date("2025-04-10").toISOString(),
        updatedAt: new Date("2025-04-10").toISOString()
    }
];

// Contador para gerar IDs auto-incrementais para novos livros
let nextId = 8;


/**
 * Retorna uma lista de livros aplicando filtros, ordenação e paginação.
 * @param {Object} [params] - Parâmetros de consulta (genre, search, sort, order, page, limit)
 * @returns {Object} Objeto contendo os dados paginados e metadados de paginação
 */
function getAll({ genre, search, sort, order, page, limit } = {}) {
    let result = [...books];

    // Filtra por gênero (case-insensitive)
    if (genre) {
        const g = genre.toLowerCase();
        result = result.filter(b => b.genre.toLowerCase() === g);
    }

    // Filtra por termo de busca no título (case-insensitive)
    if (search) {
        const term = search.toLowerCase();
        result = result.filter(b => b.title.toLowerCase().includes(term));
    }

    // Ordenação por campos permitidos e direção (asc/desc)
    const validSortFields = ["title", "price", "quantity", "genre", "author", "createdAt"];
    if (sort && validSortFields.includes(sort)) {
        const dir = order === "desc" ? -1 : 1;
        result.sort((a, b) => {
            if (a[sort] < b[sort]) return -1 * dir;
            if (a[sort] > b[sort]) return 1 * dir;
            return 0;
        });
    }

    // Lógica de paginação
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || result.length;
    const total = result.length;
    const totalPages = Math.ceil(total / limitNum);
    const start = (pageNum - 1) * limitNum;
    const paginated = result.slice(start, start + limitNum);

    return {
        data: paginated,
        pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages
        }
    };
}


/**
 * Busca um livro específico pelo seu ID.
 * @param {number} id - ID do livro
 * @returns {Object|null} O livro encontrado ou null caso não exista
 */
function getById(id) {
    return books.find(b => b.id === id) || null;
}


/**
 * Verifica se já existe um livro cadastrado com o mesmo título.
 * Permite excluir um ID específico da verificação (útil em atualizações).
 * @param {string} title - Título a ser verificado
 * @param {number|null} [excludeId=null] - ID a ser ignorado na busca
 * @returns {boolean} True se já existir, false caso contrário
 */
function existsByTitle(title, excludeId = null) {
    const lower = title.toLowerCase();
    return books.some(b => b.title.toLowerCase() === lower && b.id !== excludeId);
}


/**
 * Cria e adiciona um novo livro ao array em memória.
 * @param {Object} data - Dados do livro a ser criado
 * @returns {Object} O objeto do livro recém-criado
 */
function create(data) {
    const now = new Date().toISOString();
    const book = {
        id: nextId++,
        title: data.title,
        description: data.description || "",
        price: data.price,
        quantity: data.quantity,
        genre: data.genre,
        author: data.author || "Desconhecido",
        createdAt: now,
        updatedAt: now
    };
    books.push(book);
    return book;
}


/**
 * Atualiza completamente um livro existente (substituição total dos dados).
 * @param {number} id - ID do livro
 * @param {Object} data - Novos dados do livro
 * @returns {Object|null} O livro atualizado ou null se não for encontrado
 */
function update(id, data) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;

    books[index] = {
        id,
        title: data.title,
        description: data.description || "",
        price: data.price,
        quantity: data.quantity,
        genre: data.genre,
        author: data.author || "Desconhecido",
        createdAt: books[index].createdAt, // Preserva a data de criação original
        updatedAt: new Date().toISOString() // Atualiza a data de modificação
    };
    return books[index];
}


/**
 * Atualiza parcialmente um livro existente (apenas os campos enviados).
 * @param {number} id - ID do livro
 * @param {Object} data - Objeto contendo os campos a serem alterados
 * @returns {Object|null} O livro atualizado ou null se não for encontrado
 */
function patch(id, data) {
    const book = getById(id);
    if (!book) return null;

    if (data.title !== undefined) book.title = data.title;
    if (data.description !== undefined) book.description = data.description;
    if (data.price !== undefined) book.price = data.price;
    if (data.quantity !== undefined) book.quantity = data.quantity;
    if (data.genre !== undefined) book.genre = data.genre;
    if (data.author !== undefined) book.author = data.author;
    book.updatedAt = new Date().toISOString();

    return book;
}


/**
 * Remove um livro do array com base no ID.
 * @param {number} id - ID do livro
 * @returns {boolean} True se removido com sucesso, false se não encontrado
 */
function remove(id) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
}


/**
 * Calcula e retorna estatísticas gerais sobre o estoque de livros.
 * @returns {Object} Objeto com total de livros, valor total, mais caro, mais barato, sem estoque e contagem por gênero
 */
function getStats() {
    if (books.length === 0) {
        return { total: 0, totalValue: 0, mostExpensive: null, cheapest: null, outOfStock: 0 };
    }

    // Calcula o valor total financeiro em estoque (preço * quantidade)
    const totalValue = books.reduce((sum, b) => sum + b.price * b.quantity, 0);
    
    // Ordena os livros por preço decrescente para identificar mais caro e mais barato
    const sorted = [...books].sort((a, b) => b.price - a.price);
    
    // Conta quantos livros estão com quantidade igual a zero (sem estoque)
    const outOfStock = books.filter(b => b.quantity === 0).length;
    
    // Agrupa a contagem de livros por gênero
    const byGenre = {};
    books.forEach(b => {
        byGenre[b.genre] = (byGenre[b.genre] || 0) + 1;
    });

    return {
        total: books.length,
        totalValue: parseFloat(totalValue.toFixed(2)),
        mostExpensive: sorted[0],
        cheapest: sorted[sorted.length - 1],
        outOfStock,
        byGenre
    };
}


/**
 * Retorna uma lista única e ordenada alfabeticamente de todos os gêneros cadastrados.
 * @returns {Array} Lista de gêneros distintos
 */
function getDistinctGenres() {
    const set = new Set(books.map(b => b.genre));
    return [...set].sort();
}

// Exporta todas as funções do serviço para uso nos controllers
module.exports = {
    getAll,
    getById,
    existsByTitle,
    create,
    update,
    patch,
    remove,
    getStats,
    getDistinctGenres
};