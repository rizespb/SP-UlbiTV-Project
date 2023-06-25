import { BuildOptions } from '../types/config'

export function buildBabelLoader({ isDev }: BuildOptions) {
    return {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                // preset-env для перевода JS в более старые стандарты
                presets: ['@babel/preset-env'],
                plugins: [
                    // Подлючаем для работы с i18n, чтобы вебпак при сборке порбегался по всем файлам и вытаскивал все ключи для переводов в один объект, помещая их в папку extractedTranslations
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            // Ключ по-умолчанию равен значению. Иначе значение будет ""
                            keyAsDefaultValue: true,
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
