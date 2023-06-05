import webpack from 'webpack'

export function buildLoaders(): webpack.RuleSetRule[] {
  const typescriptLoader = {
    // Для обработки *.ts, *.tsx
    test: /\.tsx?$/,
    use: 'ts-loader',
    // Не обрабатываем папку node_modules
    exclude: /node_modules/,
  }

	// Важно! Последовательность вызова лоадеров имеет значение!
  return [typescriptLoader]
}
