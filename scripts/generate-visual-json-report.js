const { promisify } = require('util')
const { readdir, writeFile } = require('fs')
const { join: joinPath, relative } = require('path')

const asyncReaddir = promisify(readdir)
const writeFileAsync = promisify(writeFile)

const lokiDir = joinPath(__dirname, '..', '.loki')
const actualDir = joinPath(lokiDir, 'current')
const expectedDir = joinPath(lokiDir, 'reference')
const diffDir = joinPath(lokiDir, 'difference')

/*
Этот скрипт взяли отсюда
https://github.com/oblador/loki/issues/76#issuecomment-595777550
Важно! для работы скрипта надо установить reg-cli
Этот скрипт в папке ./loki создает два отчета:
"test:ui:json": "node scripts/generate-visual-json-report.js" создает ./loki/report.json

"test:ui:html": "reg-cli --from .loki/report.json --report .loki/report.html"  создает ./loki/report.html

Отчеты, по сути, одинаковые
 В этих отчетах можно увидеть (в html удобное визуальное представление) разницу Sceenshot-тестирования с помощью Loki
*/

;(async function main() {
    const diffs = await asyncReaddir(diffDir)

    await writeFileAsync(
        joinPath(lokiDir, 'report.json'),
        JSON.stringify({
            newItems: [],
            deletedItems: [],
            passedItems: [],
            failedItems: diffs,
            expectedItems: diffs,
            actualItems: diffs,
            diffItems: diffs,
            actualDir: relative(lokiDir, actualDir),
            expectedDir: relative(lokiDir, expectedDir),
            diffDir: relative(lokiDir, diffDir),
        }),
    )
})()
