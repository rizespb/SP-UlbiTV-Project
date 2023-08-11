const createTemplate = require('./templates/createTemplate')

// Мы вызываем скрипт, находясь в корне проекта, командой
// node scripts/createSlice/index.js имя_слоя имя_слайса
// argv[0] - путь до node (  'C:\\Users\\AMaklachkov\\AppData\\Roaming\\nvm\\v16.14.0\\node.exe')
// argv[1] - путь до скрипта ('C:\\Users\\AMaklachkov\\Desktop\\SP-UlbiTV-Project\\scripts\\createSlice\\index.js')
// argv[2] - введенное имя нового слоя, argv[3] - имя слайса
const layer = process.argv[2]
const sliceName = process.argv[3]

// Автогенерацию будем делать только для этих слоев
const layers = ['features', 'entities', 'pages']

if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`)
}

if (!sliceName) {
    throw new Error('Укажите название слайса')
}

createTemplate(layer, sliceName)
