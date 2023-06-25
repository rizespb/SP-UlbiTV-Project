import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoaders } from './loaders/buildCssLoaders'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options

    // Если файл имеет расширение svg, использовать @svgr/webpack
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    // Если бы нам не нужны были другие плагины, которые подключаются через babel, то можно было бы не подключать babel, т.к. компиляцией занимался бы TS
    // Если бы не использовали TS (и в частности typescriptLoader), тогда нам в любом случае пришлось бы подключать babelLoader и @babel/preset-react
    const babelLoader = buildBabelLoader(options)

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

    // Если бы мы не использовали TS, мы бы еще подключали Babel для работы с JSX. Но ts-loader с этим справляется сам
    const typescriptLoader = {
        // Для обработки *.ts, *.tsx
        test: /\.tsx?$/,
        use: 'ts-loader',
        // Не обрабатываем папку node_modules
        exclude: /node_modules/,
    }

    // Важно! Последовательность вызова лоадеров имеет значение!
    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader]
}
