const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const createModel = require('./createModel')
const createUI = require('./createUI')
const createPublicApi = require('./createPublicApi')

module.exports = async (layer, sliceName) => {
    try {
        // Создаем папку корень_проекта/имя_слоя/имя_слайса
        await fs.mkdir(resolveRoot('src', layer, sliceName))
    } catch (e) {
        console.log(`не удалось создать директорию для слайса${sliceName}`)
    }

    // Создаем папку model с содержимым
    await createModel(layer, sliceName)
    // Создаем папку ui с содержимым
    await createUI(layer, sliceName)
    // Создаем папку index.ts
    await createPublicApi(layer, sliceName)
}
