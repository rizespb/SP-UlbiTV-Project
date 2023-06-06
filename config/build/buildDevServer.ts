import { BuildOptions } from './types/config'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    // автоматически открывать страницу с приложением в браузере
    open: true,
    // Проксировать запросы через index страницу (главную). Чтобы при переходе по прямой ссылке на любую страницу Роутер "подхватывал" адрес и рендерил то, что надо
    historyApiFallback: true,
  }
}
