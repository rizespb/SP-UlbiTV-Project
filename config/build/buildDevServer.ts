import type { Configuration as DevServerConfig } from 'webpack-dev-server'
import { BuildOptions } from './types/config'

export function buildDevServer(options: BuildOptions): DevServerConfig {
    return {
        port: options.port,
        // автоматически открывать страницу с приложением в браузере
        open: true,
        // Проксировать запросы через index страницу (главную). Чтобы при переходе по прямой ссылке на любую страницу Роутер "подхватывал" адрес и рендерил то, что надо
        historyApiFallback: true,
        // Чтобы работал hot replacement (обновление страницы без перезагрузки)
        hot: true,
    }
}
