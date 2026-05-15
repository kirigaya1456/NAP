const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { name, description } = req.query;
    const stocks = stocksService.findAll(name, description);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);

    if (!stock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.json(stock);
};

const getStockByDescription = (req, res) => {
    // Получаем описание из параметров URL (например, /stocks/description/облачные) или query
    const description = req.params.description || req.query.description;
    const stocks = stocksService.findAll(null, description);

    if (!stocks || stocks.length === 0) {
        return res.status(404).json({ error: 'Услуги с таким описанием не найдены' });
    }

    res.json(stocks);
};

const createStock = (req, res) => {
    const { src, name, description } = req.body;

    // Простая валидация
    if (!src || !name || !description) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newStock = stocksService.create({ src, name, description });
    res.status(201).json(newStock);
};

const updateStock = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = stocksService.update(id, req.body);

    if (!updatedStock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.json(updatedStock);
};

const deleteStock = (req, res) => {
    const id = parseInt(req.params.id);
    const success = stocksService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.status(204).send(); // 204 No Content
};

module.exports = {
    getAllStocks,
    getStockById,
    getStockByDescription,
    createStock,
    updateStock,
    deleteStock
};
