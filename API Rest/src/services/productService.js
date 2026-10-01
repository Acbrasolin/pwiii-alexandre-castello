

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

let nextId = 8;



function getAll({ genre, search, sort, order, page, limit } = {}) {
    let result = [...books];

  
    if (genre) {
        const g = genre.toLowerCase();
        result = result.filter(b => b.genre.toLowerCase() === g);
    }

  
    if (search) {
        const term = search.toLowerCase();
        result = result.filter(b => b.title.toLowerCase().includes(term));
    }

  
    const validSortFields = ["title", "price", "quantity", "genre", "author", "createdAt"];
    if (sort && validSortFields.includes(sort)) {
        const dir = order === "desc" ? -1 : 1;
        result.sort((a, b) => {
            if (a[sort] < b[sort]) return -1 * dir;
            if (a[sort] > b[sort]) return 1 * dir;
            return 0;
        });
    }

    
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

function getById(id) {
    return books.find(b => b.id === id) || null;
}

function existsByTitle(title, excludeId = null) {
    const lower = title.toLowerCase();
    return books.some(b => b.title.toLowerCase() === lower && b.id !== excludeId);
}



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
        createdAt: books[index].createdAt,
        updatedAt: new Date().toISOString()
    };
    return books[index];
}

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

function remove(id) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
}


function getStats() {
    if (books.length === 0) {
        return { total: 0, totalValue: 0, mostExpensive: null, cheapest: null, outOfStock: 0 };
    }

    const totalValue = books.reduce((sum, b) => sum + b.price * b.quantity, 0);
    const sorted = [...books].sort((a, b) => b.price - a.price);
    const outOfStock = books.filter(b => b.quantity === 0).length;
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



function getDistinctGenres() {
    const set = new Set(books.map(b => b.genre));
    return [...set].sort();
}

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