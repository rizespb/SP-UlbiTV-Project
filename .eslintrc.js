module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        // plugin:i18next/recommended' -будет указывать на, что требуется обернуть тектст в хук для перевода
        'plugin:i18next/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    // i18next -будет указывать на, что требуется обернуть тектст в хук для перевода
    plugins: ['react', '@typescript-eslint', 'i18next', 'prettier'],
    rules: {
        semi: ['error', 'never'],

        // Настраиваем количество пробелов в отсутпах на первом месте:
        // 2 === error, 1 === warn, 0 === off
        indent: [2, 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': [2, 4],
        // Указываем расширения для файлов Реакт
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/require-default-props': 'off',
        // Отключили, потому что свойство влохо работает с TS
        'no-shadow': 'off',
        'import/no-extraneous-dependencies': 'off',
        // Разрешаем нижние подчеркивания
        'no-underscore-dangle': 'off',
        // показывать ошибку, если строки в JSX не обернуты в хук для перевода
        'i18next/no-literal-string': ['error', { markupOnly: true }],
        // Два правила, чтобы была возможность писать неиспользуемые переменные начиная с _
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' },
        ],
    },
    globals: {
        __IS_DEV__: true,
    },
}
