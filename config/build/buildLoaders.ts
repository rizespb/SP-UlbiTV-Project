import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/config'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  // file-loader - это загрузчик для Webpack, который позволяет переносить файлы проекта (например, изображения, шрифты и другие статические ресурсы) в выходную директорию сборки (По умолчанию Webpack обрабатывает только JavaScript-файлы)
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Создает стили из JS-строк
      // style-loader конвертирует в JS (более быстро при dev)
      // MiniCssExtractPlugin (Работает вемсте с плагином MiniCssExtractPlugin) выдяеляет стили в отдельные файлы
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
            localIdentName: isDev ? '"[path][name]__[local]--[hash:base64:5]"' : '[hash:base64:8]',
          },
        },
      },
      // Компилирует Sass to CSS
      'sass-loader',
    ],
  }

  // Если бы мы не использовали TS, мы бы еще подключали Babel для работы с JSX. Но ts-loader с этим справляется сам
  const typescriptLoader = {
    // Для обработки *.ts, *.tsx
    test: /\.tsx?$/,
    use: 'ts-loader',
    // Не обрабатываем папку node_modules
    exclude: /node_modules/,
  }

  // Важно! Последовательность вызова лоадеров имеет значение!
  return [fileLoader, svgLoader, typescriptLoader, cssLoader]
}
