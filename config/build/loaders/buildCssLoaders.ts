// Вынесли в отдельную функцию, т.к. используем и в настройках webpack, и в настройках webpack для Storybook

import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoaders(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // Создает стили из JS-строк
            // style-loader конвертирует в JS (более быстро при dev)
            // MiniCssExtractPlugin (Работает вместе с плагином MiniCssExtractPlugin) выдяеляет стили в отдельные файлы
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Транслирует CSS в CommonJS и подключает модули
            {
                loader: 'css-loader',
                options: {
                    // Для включения CSS-модулей
                    modules: {
                        // Применять модульность только к файлам, содержащим '.module.' (изоляция, генерация уникальный имен классов)
                        // index.scss - не применяется
                        // Counter.module.scss - применяется
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        // В дев-режиме имя класса будет состоять из пути к файлу-имени-класса-хэша - в прод будет хэш
                        localIdentName: isDev
                            ? '"[path][name]__[local]--[hash:base64:5]"'
                            : '[hash:base64:8]',
                    },
                },
            },
            // Компилирует Sass to CSS
            'sass-loader',
        ],
    }
}
