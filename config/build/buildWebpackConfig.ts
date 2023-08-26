import webpack from 'webpack'
import { BuildOptions } from './types/config'
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
            // Нужен для того, чтобы приложение искало бандлы вложенных роутов, например, /articles/:1 не по пути /articles/CHANK_NAME.js, а по пути /CHANK_NAME.js
            publicPath: '/',
        },

        plugins: buildPlugins(options),

        module: {
            // В поле rules мы конфигурируем лоадеры, т.е. программы, которые будут отвечать за подключение файлов НЕ *.js (например, jpeg, css, ts)
            rules: buildLoaders(options),
        },

        resolve: buildResolvers(options),

        // Указывает сборщику, как генерировать sourcemap (карту соответствия исходного кода и скомпилированного кода).
        // Чтобы в случае ошибки мы могли найти ее в коде, а не только в огромном бандле
        // 'inline-source-map' больше для разработки, не не для прода. Есть другие варианты
        // Потом поменяли 'inline-source-map' на 'eval-cheap-module-source-map', т.к.  документация рекомендует этот режим для более быстрого ребилда во время разработки
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,

        // Пересборка проекта во время разработки
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}
