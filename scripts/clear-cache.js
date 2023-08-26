// Скрипт для очистки папки node_modules/.cache (в которой сохраняется кэш babelLoader, storybook и пр.)
// Рекомендуется выполнять после установки новых зависимостей

// Поместили в postinstall скрипт в package.json.
// По идее, postinstall автоматически должен запускаться после установки новой зависимости. Но у меня так и не стал запускаться автоматически. Можно запустить вручную npm run postinstall
const fs = require('fs')
const path = require('path')

const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache')

fs.rmSync(cacheDir, { recursive: true, force: true })

console.log('Congratulations! node_modules/.cache was deleted')
