import { BuildEnv, BuildPath } from './config/build/types/config'
import webpack from 'webpack' // для доступа ко встроенным плагинам
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import path from 'path'

// Фукнции, которая экспортируется из webpack.config.ts будут передан в качестве параметра env-переменные
// https://webpack.js.org/guides/environment-variables/
export default (env: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }

  const mode = env.mode || 'development'
  const PORT = env.port || 3000

  const isDev = mode === 'development'

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  })

  return config
}
