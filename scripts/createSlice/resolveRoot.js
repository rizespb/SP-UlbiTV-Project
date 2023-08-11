const path = require('path')

// Выходим в корень проекта и добавление к корню проекте переданных в segments сегментов пути
module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments)
