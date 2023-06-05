import { BuildOptions } from './types/config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
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
  ]
}
