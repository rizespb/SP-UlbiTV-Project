import webpack from 'webpack'

export function buildLoaders(): webpack.RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Создает стили из JS-строк
      'style-loader',
      // Транслирует CSS в CommonJS
      'css-loader',
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
  return [typescriptLoader, cssLoader]
}
