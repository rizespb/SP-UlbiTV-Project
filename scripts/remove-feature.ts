import { Node, Project, SyntaxKind } from 'ts-morph'

//
// Скрипт для обхода проекта и автоматического удаления ненужных фичей, релализованных с помощью функции toggleFeatures
// Для написания скрипта пользовались ATS https://astexplorer.net/
//

// removedFeatureName и featureState - аргументы, которые мы будем передавать в скрипт
// Перывй аргумент -  Имя фичи, которую надо удалить, например, 'isFeatureEnabled'
const removedFeatureName = process.argv[2] // example isArticleEnabled

// Второй аргумент - Значение фичи, которое мы хотим оставить (on или off)
const featureState = process.argv[3] // example off\on

// Если название фичи не передали, то бросаем ошибку
if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага')
}

// Если нужное состояние фичи не передали, то бросаем ошибку
if (!featureState) {
    throw new Error('Укажите состояние фичи (on или off)')
}

// Проверяем, что аргумент featureState (нужное состояние фичи) имеет нужное значение
if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное значение состояния фичи (on или off)')
}

const project = new Project({})

// Какие файлы проекта надо перебрать
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx')
// project.addSourceFilesAtPaths('src/**/*.ts')
// project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

// Проверяем, является ли нода функцией toggleFeatures
function isToggleFunction(node: Node) {
    let isToggleFeatures = false

    // Проходимся по всем детям ноды
    node.forEachChild((child) => {
        if (
            // Смотрим, что текущий ребенок является идентификатором
            child.isKind(SyntaxKind.Identifier) &&
            // И функция называется toggleFeatures
            child.getText() === 'toggleFeatures'
        ) {
            // Если ноду 'toggleFeatures' нашли, то переключаем флаг на true
            isToggleFeatures = true
        }
    })

    return isToggleFeatures
}

// В каждом файле мы проходим по всем нода, надоходим ноду с нужным типом и проверить ее название
files.forEach((sourceFile) => {
    // forEachDescendant - метод, аналогичный forEach для обхода всех потомков в файле
    sourceFile.forEachDescendant((node) => {
        // Находим ноду с типом CallExpression - вызов функции
        // Если это вызов функции
        // И функция является фукнцией 'toggleFeatures'
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            // getFirstDescendantByKind - получить первого потомка по типу
            // Получаем из AST объект со свойствами, которые нам нужны
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            )

            if (!objectOptions) return

            // Получаем интересующие нас свойства
            // on, off и name
            // В off будет лежать что-то похожее:
            // off: () => <ComponentName />
            const offFunctionProperty = objectOptions.getProperty('off')
            // on: () => <ComponentName />
            const onFunctionProperty = objectOptions.getProperty('on')

            // name: 'isFeatureNameEnabled'
            const featureNameProperty = objectOptions.getProperty('name')

            // В on и off обязательно должны быть стрелочные функции, чтобы все было стандартизировано и мы могли вытащить их
            // Достаем фукнцию on
            const onFunction = onFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            )
            // Достаем фукнцию off
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            )

            // Достаем имя фичи из строки с name
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                // Получили строку вида 'isFeatureNameEnabled'
                ?.getText()
                // Удаляем из строки кавычки (первый и последний символ)
                .slice(1, -1)

            // Если featureName, который мы нашли не совпадает с именем фичи, которую мы хотим найти и обработать, то заканчиваем скрипт
            if (featureName !== removedFeatureName) return

            // Если нужное состояние фичи === on, то удаляем одну часть кода
            if (featureState === 'on') {
                // Заменяем содержимое ноды содержимым тела on-функции onFunction
                // Если onFunction была () => <ComponentName />
                // То будет заменено на <ComponentName />
                node.replaceWithText(onFunction?.getBody().getText() ?? '')
            }

            // Если нужное состояние фичи === off, то удаляем другую часть кода
            if (featureState === 'off') {
                // Заменяем содержимое ноды содержимым тела off-функции offFunction
                // Если offFunction была () => <ComponentName />
                // То будет заменено на <ComponentName />
                node.replaceWithText(offFunction?.getBody().getText() ?? '')
            }
        }
    })
})

project.save()
