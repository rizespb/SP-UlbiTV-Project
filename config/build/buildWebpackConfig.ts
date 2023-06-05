import { BuildOptions } from './types/config'
import webpack from 'webpack'
import path from 'path'
import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options

  return {
    // 'development' - для сборки во время разрабоки
    // 'production' - сборка для деплоя на сервер
    mode,

    // Точка входа - стартовая точка для входа в приложение
    // Можно передать путь к точке входа или объект с путями к нескольким точкам входа
    entry: paths.entry,

    output: {
      // Для решения проблемы кэширования в браузере. Можно использовать [hash], [contenthash] и т.д.
      filename: '[name].[contenthash].js',
      path: paths.build,
      // Удалять файлы предыдущей сборки во время сборки
      clean: true,
    },

    plugins: buildPlugins(options),

    module: {
      // В поле rules мы конфигурируем лоадеры, т.е. программы, которые будут отвечать за подключение файлов НЕ *.js (например, jpeg, css, ts)
      rules: buildLoaders(),
    },

    resolve: buildResolvers(),

    // Указывает сборщику, как генерировать sourcemap (карту соответствия исходного кода и скомпилированного кода).
    // Чтобы в случае ошибки мы могли найти ее в коде, а не только в огромном бандле
    // 'inline-source-map' больше для разработки, не не для прода. Есть другие варианты
    devtool: isDev ? 'inline-source-map' : undefined,

    // Пересборка проекта во время разработки
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
