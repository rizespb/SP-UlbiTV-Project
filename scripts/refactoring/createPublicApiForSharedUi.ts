import { Project } from 'ts-morph'
import path from 'path'

// Добавить public API во всех src/shared/ui компоненты сразу за один проход
// То есть автоматически создать файл вида /shared/ui/AppLink/index.ts с реэкспортом (public API)
// index.ts -> export * from './ComponentName
const project = new Project({})

// Рекурсивно пройти по всем файлам ts и tsx
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

// Получить все найденные файлы
const files = project.getSourceFiles()

// Путь к папке shared/ui относительно текущего файла createPublicApiForSharedUi.ts
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')

// Получить саму папку shared/ui
const sharedUiDirectory = project.getDirectory(uiPath)

// Получить вложенные папки из shared/ui (это будут папки с компонентами)
const componentsDirs = sharedUiDirectory?.getDirectories()

// Функция для проверки того, что импорт является абсолютным (начинается с одного из слоев)
function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
    return layers.some((layer) => value.startsWith(layer))
}

// Итерируемся по папкам с компонентами
componentsDirs?.forEach((directory) => {
    // Получаем путь к файлу index
    const indexFilePath = `${directory.getPath()}/index.ts`

    // Получаем сам индексный файл (public API)
    const indexFile = directory.getSourceFile(indexFilePath)

    // Если индексного файла нет, создаем его
    if (!indexFile) {
        // Имя tsx-файла с компонентом в нашем проекте совпадает с именем папки, в которой этот файл лежит
        const sourceCode = `export * from './${directory.getBaseName()}'`

        // Создаем файл index.ts с "export * from './ComponentName"
        const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true })

        file.save()
    }
})

// Надо во всех файлах проекта, где раньше использовались импорты вида:
// from "shared/ui/AppLink/AppLink"
// заменить такие импорты на from "shared/ui/AppLink" (на имопрты из public API)
files.forEach((sourceFile) => {
    // Получаем ноды импортов, используемых в файле
    const importDeclarations = sourceFile.getImportDeclarations()

    // Итерируемся по каждому импорту в файле
    importDeclarations.forEach((importDeclaration) => {
        // Поулчаем строку-код с импротом (import {...} from "@/shared/ui/AppLink/AppLink)
        const value = importDeclaration.getModuleSpecifierValue()

        // Избавляемся от алиаса в этой строке
        const valueWithoutAlias = value.replace('@/', '')

        // Разделяем строку на сегменты
        // Получим ['shared', 'ui, 'AppLink', 'AppLink]
        const segments = valueWithoutAlias.split('/')

        // Провеяем, является ли это импортом из слоя shared
        const isSharedLayer = segments?.[0] === 'shared'
        // И является ли это импортом из папки ui
        const isUiSlice = segments?.[1] === 'ui'

        // Если это абсолютный импорт из одного из архитектурный слоев
        // А именно из shared, из папки ui
        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            // Избавляемся от всего остатка пути после первых трех сегментов
            // Например, получаем [shared, ui, AppLink]
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/')

            // И добавляем алиас
            // Заменяем импорт на обновленный
            importDeclaration.setModuleSpecifier(`@/${result}`)
        }
    })
})

project.save()
