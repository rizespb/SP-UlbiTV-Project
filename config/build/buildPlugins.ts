import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack from 'webpack'
import { BuildOptions } from './types/config'

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // Для генерации html-файлов с подключенными к скриптами
        new HtmlWebpackPlugin({
            // Создаст html-файл на основе указанного файла
            template: paths.html,
        }),

        // Отображение процентов - прогресса сборки во время выполнения сборки
        new webpack.ProgressPlugin(),

        // Без MiniCssExtractPlugin стили конвертируются в JS. Он создает отдельный файл со стилями. // Работает вместе с лоадером MiniCssExtractPlugin.loader
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            // Имена для чанков, когда мы будем разбивать файлы на чанки и подгружать асинхронно
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        // Позволяет добавлять в сборку глобальные переменные
        // По сути, заменняет при сборке указанную переменную переданным значением
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),

        // hot replacement (обновление страницы без перезагрузки) (некоторые изменения компонентов реакт все равно требуют перезагрузки. Лучше использовать React Refresh Webpack Plugin)
        new webpack.HotModuleReplacementPlugin(),

        // Анализ размера бандлов. После подключение при запуске npm start или npm run build откроектся еще и страница с размером бандла
        new BundleAnalyzerPlugin({
            // Страница с анализатором не будет автоматически открываться в браузере
            // Но в терминале будет указан сервер, по которому она запущена - http://127.0.0.1:8888
            openAnalyzer: false,
        }),
    ]
}
