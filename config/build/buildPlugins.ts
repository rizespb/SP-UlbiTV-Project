import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
// Проверка кольцевых зависимостей
import CircularDependencyPlugin from 'circular-dependency-plugin'
// Проверка типов TS (потребовалось после отключения typeScriptLoader)
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { BuildOptions } from './types/config'

export function buildPlugins(buildOptions: BuildOptions): webpack.WebpackPluginInstance[] {
    const { paths, isDev, apiUrl, project } = buildOptions

    const isProd = !isDev

    const plugins = [
        // Для генерации html-файлов с подключенными к скриптами
        new HtmlWebpackPlugin({
            // Создаст html-файл на основе указанного файла
            template: paths.html,
        }),

        // Отображение процентов - прогресса сборки во время выполнения сборки
        new webpack.ProgressPlugin(),

        // Позволяет добавлять в сборку глобальные переменные
        // По сути, заменяет при сборке указанную переменную переданным значением
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),

        // Плагин для отслеживания кольцевых зависимостей
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        // Важно! После отключения typescriptLoader у нас не будет происходить проверка типов: babelLoader это не может делать. Для проверки типов надо добавить плагин fork-ts-checker-webpack-plugin
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ]

    if (isDev) {
        // Обновление страницы без перезагрузки - более современный плагин, чем HotModuleReplacementPlugin
        // Мы вначале подключили HotModuleReplacementPlugin, потом ReactRefreshWebpackPlugin
        // Я не понял, почему при этом мы не отключили HotModuleReplacementPlugin
        plugins.push(new ReactRefreshWebpackPlugin())

        plugins.push(
            // hot replacement (обновление страницы без перезагрузки) (некоторые изменения компонентов реакт все равно требуют перезагрузки. Лучше использовать React Refresh Webpack Plugin)
            new webpack.HotModuleReplacementPlugin(),
        )

        plugins.push(
            // Анализ размера бандлов. После подключение при запуске npm start или npm run build откроектся еще и страница с размером бандла
            new BundleAnalyzerPlugin({
                // Страница с анализатором не будет автоматически открываться в браузере
                // Но в терминале будет указан сервер, по которому она запущена - http://127.0.0.1:8888
                openAnalyzer: false,
            }),
        )
    }

    if (isProd) {
        plugins.push(
            // Без MiniCssExtractPlugin стили конвертируются в JS. Он создает отдельный файл со стилями. // Работает вместе с лоадером MiniCssExtractPlugin.loader
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                // Имена для чанков, когда мы будем разбивать файлы на чанки и подгружать асинхронно
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        )

        plugins.push(
            // При сборке перемещать переводы из path.locales в paths.buildLocales
            new CopyPlugin({
                patterns: [{ from: paths.locales, to: paths.buildLocales }],
            }),
        )
    }

    return plugins
}
