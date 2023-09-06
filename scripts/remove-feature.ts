import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph'

//
// Скрипт для обхода проекта и автоматического удаления ненужных фичей, релализованных с помощью функции toggleFeatures или компонента ToggleFeatures
// Для написания скрипта пользовались ATS https://astexplorer.net/
//

// removedFeatureName и featureState - аргументы, которые мы будем передавать в скрипт
// Перывй аргумент -  Имя фичи, которую надо удалить, например, 'isFeatureEnabled'
const removedFeatureName = process.argv[2] // example isArticleEnabled

// Второй аргумент - Значение фичи, которое мы хотим оставить (on или off)
const featureState = process.argv[3] // example off\on

// Название функции, которую будем искать в коде
const toggleFunctionName = 'toggleFeatures'
// Название компонента, который будем искать в коде
const toggleComponentName = 'ToggleFeatures'

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
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

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
            child.getText() === toggleFunctionName
        ) {
            // Если ноду 'toggleFeatures' нашли, то переключаем флаг на true
            isToggleFeatures = true
        }
    })

    return isToggleFeatures
}

// Проверяем, является ли нода компонентом ToggleFeatures
function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)

    return identifier?.getText() === toggleComponentName
}

// Функция для замены функции toggleFeatures на значение из ее аргумента on или off
const replaceToggleFunction = (node: Node) => {
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

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
    jsxAttributes.find((node) => node.getName() === name)

// Получаем значение (компонент) из ноды пропса on или ноды пропса off
const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText()

    // Если начинается с (
    // Обрезаем по одному символу с начала и с конка
    if (value?.startsWith('(')) {
        return value.slice(1, -1)
    }

    return value
}

// Функция для замены функции ToggleFeatures на значение из его пропсов on или off
const replaceComponent = (node: Node) => {
    // Получаем пропсы (аттрибуты)
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

    // Получем ноду (это еще не значение) пропса on
    const onAttribute = getAttributeNodeByName(attributes, 'on')
    // Получем ноду (это еще не значение) пропса off
    const offAttribute = getAttributeNodeByName(attributes, 'off')

    // Значение пропса feature - имя ФТ, с которым работаем в данный момент
    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature')

    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        // Получили строку вида 'isFeatureNameEnabled'
        ?.getText()
        // Удаляем из строки кавычки (первый и последний символ)
        ?.slice(1, -1)

    // Если имя фичи не совпадает с искомым, заканчиваем работу функции
    if (featureName !== removedFeatureName) return

    const offValue = getReplacedComponent(offAttribute)
    const onValue = getReplacedComponent(onAttribute)

    // Если в скрипт передан аргумент on, тогда ноду компонента ToggleComponent заменяем на onValue
    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue)
    }

    // Если в скрипт передан аргумент off, тогда ноду компонента ToggleComponent заменяем на offValue
    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue)
    }
}

// В каждом файле мы проходим по всем нода, надоходим ноду с нужным типом и проверить ее название
files.forEach((sourceFile) => {
    // forEachDescendant - метод, аналогичный forEach для обхода всех потомков в файле
    sourceFile.forEachDescendant((node) => {
        // Находим ноду с типом CallExpression - вызов функции
        // Если это вызов функции
        // И функция является фукнцией 'toggleFeatures'
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node)
        }

        // Если нода является JsxSelfClosingElement - компонентом без children
        // И этот компонент ToggleComponent
        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            return replaceComponent(node)
        }

        return null
    })
})

project.save()
