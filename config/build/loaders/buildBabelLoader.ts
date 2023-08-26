/* eslint-disable indent */
import { BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
    const isProd = !isDev

    return {
        // Обрабатываем или только файлы с JSX (TSX), или только файлы JS(TS)
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                // Куски кода, которые редко меняются, будут сохраняться в кэш и будут реже перебилдиваться
                // Общая папка для кэше библиотек node_modules/.cache
                cacheDirectory: true,
                // preset-env для перевода JS в более старые стандарты
                presets: ['@babel/preset-env'],
                plugins: [
                    // Подлючаем для работы с i18n, чтобы вебпак при сборке пробегался по всем файлам и вытаскивал все ключи для переводов в один объект, помещая их в папку extractedTranslations
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            // Ключ по-умолчанию равен значению. Иначе значение будет ""
                            keyAsDefaultValue: true,
                        },
                    ],
                    // Добавилли при отказе от typeScriptLoader-а и замены его функций babelLoader-ом
                    // Важно! После отключения typescriptLoader у нас не будет происходить проверка типов: babelLoader это не может делать. Для проверки типов надо добавить плагин fork-ts-checker-webpack-plugin в buildPlugins
                    [
                        // Поддержка синтаксиса TS
                        '@babel/plugin-transform-typescript',
                        {
                            // Парсить JSX или нет
                            isTsx,
                        },
                    ],
                    // Добавилли при отказе от typeScriptLoader-а и замены его функций babelLoader-ом
                    '@babel/plugin-transform-runtime',
                    // Подключаем самописный плагин для удаления data-testid из кода JSX (*.) в нЕ dev-режиме
                    isProd &&
                        isTsx && [
                            babelRemovePropsPlugin,
                            {
                                props: ['data-testid'],
                            },
                        ],

                    // Это часть подключения React-refresh-plugin
                    // обновление страницы без перезагрузки а DEV-режиме
                    isDev && require.resolve('react-refresh/babel'),
                    // Если isDev === false, то удаляем этот false из массива плагинов
                ].filter(Boolean),
            },
        },
    }
}
