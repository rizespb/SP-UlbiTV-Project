import webpack, { RuleSetRule } from 'webpack'
import path from 'path'
import { buildCssLoaders } from '../build/loaders/buildCssLoaders'
import { BuildPath } from '../build/types/config'

// Storybook под капотом использует свои настройки Вебпак, но позволяет нам конфигурировать их
// Storybook вызовет эту фнукцию и передаст ей конфиг вебпака
export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPath = {
        // Первые три присутствуют в интерфейсе BuildPaths, но нас не интересуют, поэтому пустые строки
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    }

    // Для понимания Сторибуком абсолютных импортов в проекте
    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')

    // Настраиваем обработку svg
    if (config.module) {
        // Если правило (а более точно лоадер) содержит регулярку, указываюшщую на svg, то исключаем файлы svg из обработки этим лоадером
        // eslint-disable-next-line no-param-reassign
        config.module.rules = config.module.rules?.map((rule: RuleSetRule | '...') => {
            if (
                rule !== '...' &&
                rule.test instanceof RegExp &&
                rule.test.toString().includes('svg')
            ) {
                return { ...rule, exclude: /\.svg$/i }
            }

            return rule
        })
    }

    // Вторым шагом добавляем новое правило (новый нужный лоадер) для обработки svg
    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })

    config.module?.rules?.push(buildCssLoaders(true))

    return config
}
