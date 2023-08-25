// Библиотека для манипуляций с TypeScript AST
import { Project } from 'ts-morph'

// Скрипт для замены абсолюных импортов вида "shared/lib/..."" на "@/@shared/lib/..." сразу по всему проекту
// Понадоблися после того, как мы решили добавить alias-ы вида "@/..."
const project = new Project({})

// Рекурсивно пройти по всем файлам ts и tsx
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

// Получить все найденные файлы
const files = project.getSourceFiles()

// Ххелпер, который проверяет, является ли путь абсолютным (начинается с одного из слоев)
function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
    return layers.some((layer) => value.startsWith(layer))
}

// Проходимся по каждому файлу
files.forEach((sourceFile) => {
    // Получаем импорты из файла
    const importDeclarations = sourceFile.getImportDeclarations()

    // Пройдемся по всем нодам импортом в текущем файле
    importDeclarations.forEach((importDeclaration) => {
        // Получаем путь, откуда идет импорт (например, shared/lib/...)
        const value = importDeclaration.getModuleSpecifierValue()

        // Проверяем, что путь начинается с app | shared | entities и т.д.
        if (isAbsolute(value)) {
            // Добавляем в начало пути @/
            importDeclaration.setModuleSpecifier(`@/${value}`)
        }
    })
})

// Сохраняем изменения в файлах
project.save()
