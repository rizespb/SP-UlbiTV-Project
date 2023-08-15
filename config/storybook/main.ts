const config = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        // Дополнение, которое мокает все запросы, которые осуществляют компоненты внутри storybook
        // @TODO-Storybook Не получилось настроить моки запросов с помощью попробовать после обновления storybook до актуальной версии
        // 'storybook-addon-mock/register',
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
