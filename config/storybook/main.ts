const config = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        // Аддон, который добавляет несколько других часто используемых адднов (по дефолту)
        {
            name: '@storybook/addon-essentials',
            // Отключаем регулировку фона, чтобы не конфликтовал с аддоном storybook-addon-themes и устанавливываемыми темами
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        // Дополнение, которое мокает все запросы, которые осуществляют компоненты внутри storybook
        // @TODO-Storybook Не получилось настроить моки запросов с помощью попробовать после обновления storybook до актуальной версии
        // 'storybook-addon-mock/register',

        // Аддон для навешивания стилей на сторибук, отвеающих за тему
        // Добавлили свойство themes в preview -> parameters
        'storybook-addon-themes',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
}
export default config
