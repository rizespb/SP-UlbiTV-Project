import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoaders } from './loaders/buildCssLoaders'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options

    // Если файл имеет расширение svg, использовать @svgr/webpack
    const svgLoader = {
        test: /\.svg$/,
        
        // use: ['@svgr/webpack'],
        use: {
            loader: '@svgr/webpack',
            options: {
                // заменят в svg width и height на кастомные значения
                // Если кастомные значения в иконку не проброшены, размер иконки будет 1em * 1em
                // Ниже есть мое решение этого вопроса путем удаления removeViewBox
                icon: true,
                svgoConfig: {
                    plugins: [
                        // {
                            // Самостоятельно подключал настройку, чтобы при загрузке svg не удалялся аттрибут viewBox из svg (рендерилось некорректно)
                            // Потом заменили на icon: true (чуть выше)
                        //     name: 'removeViewBox',
                        //     active: false,
                        // },
                        {
                            // Эта настройка для того, чтобы была возможность переопределять цвет иконки fill в стилях
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ],
                },
            },
        },
    }

    // Вначале использовали typescriptLoader и babelLoader одновременно. Потом отказались от typescriptLoader ит донастроили babelLoader, заменив его двумя лоадерами: codeBabelLoader и tsxCodeBabelLoader
    // Важно! После отключения typescriptLoader у нас не будет происходить проверка типов: babelLoader это не может делать. Для проверки типов надо добавить плагин fork-ts-checker-webpack-plugin в buildPlugins
    // Если бы нам не нужны были другие плагины, которые подключаются через babel, то можно было бы не подключать babel, т.к. компиляцией занимался бы TS
    // Если бы не использовали TS (и в частности typescriptLoader), тогда нам в любом случае пришлось бы подключать babelLoader и @babel/preset-react
    // const babelLoader = buildBabelLoader(options)
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

    // file-loader - это загрузчик для Webpack, который позволяет переносить файлы проекта (например, изображения, шрифты и другие статические ресурсы) в выходную директорию сборки (По умолчанию Webpack обрабатывает только JavaScript-файлы)
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const cssLoader = buildCssLoaders(isDev)

    // Позднее отключили typescriptLoader и донастроили babelLoader, чтобы он выполнял функции typescriptLoader (причина: использование двух этих лоадеров последовательно замедляет сборку проекта)
    // Если бы мы не использовали TS, мы бы еще подключали Babel для работы с JSX. Но ts-loader с этим справляется сам
    // const typescriptLoader = {
    //     // Для обработки *.ts, *.tsx
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     // Не обрабатываем папку node_modules
    //     exclude: /node_modules/,
    // }

    // Важно! Последовательность вызова лоадеров имеет значение!
    return [fileLoader, svgLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoader]
}
