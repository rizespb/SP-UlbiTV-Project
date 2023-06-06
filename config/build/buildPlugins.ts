import { BuildOptions } from './types/config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    // Для генерации html-файлов с подключенными к скриптами
    new HtmlWebpackPlugin({
      // Создаст html-файл на основе указанного файла
      template: paths.html,
    }),
    // Отображение процентов - прогресса сборки во время выполнения сборки
    new webpack.ProgressPlugin(),
    // Без MiniCssExtractPlugin стили ковертируются в JS. Он создает отдельный файл со стилями. // Работает вемсте с плагином MiniCssExtractPlugin.loader
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      // Имена для чанков, когда мы будем разбивать файлы на чанки и подгружать асинхронно
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ]
}
