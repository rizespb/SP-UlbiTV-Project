import webpack from 'webpack' // для доступа ко встроенным плагинам
import path from 'path'
import { BuildEnv, BuildPath, BuildMode } from './config/build/types/config'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'

// Функцию добавили после деплоя на облачный сервер
// /api обрабатывается nginx-ом и перенаправляет все запросы на сервер бэкенд
function getApiUrl(mode: BuildMode, apiUrl?: string) {
    if (apiUrl) {
        return apiUrl
    }
    if (mode === 'production') {
        return '/api'
    }

    return 'http://localhost:8000'
}

// Фукнции, которая экспортируется из webpack.config.ts будут передан в качестве параметра env-переменные
// https://webpack.js.org/guides/environment-variables/
export default (env: BuildEnv) => {
    const paths: BuildPath = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        // путь до файлов с переводами
        locales: path.resolve(__dirname, 'public', 'locales'),
        // в какую папку при билде помещать переводы
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    }

    const mode = env?.mode || 'development'
    const PORT = env?.port || 3000
    const apiUrl = getApiUrl(mode, env?.apiUrl)

    const isDev = mode === 'development'

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    })

    return config
}
