module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
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
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'rizespb-fsd',
        'unused-imports',
        'prettier',
    ],
    rules: {
        semi: ['error', 'never'],

        'unused-imports/no-unused-imports': 'error',
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
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        // Отключили, потому что свойство влохо работает с TS
        'no-shadow': 'off',
        'import/no-extraneous-dependencies': 'off',
        // Разрешаем нижние подчеркивания
        'no-underscore-dangle': 'off',
        // показывать ошибку, если строки в JSX не обернуты в хук для перевода. Игнорировать текст в аттрибутах data-testid, to...
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'role',
                    'as',
                    'data-testid',
                    'to',
                    'target',
                    'direction',
                    'justify',
                    'align',
                    'gap',
                    'border',
                    'feature',
                    'color',
                    'variant',
                ],
            },
        ],
        // Чтобы не конвертировал prop={true} в просто prop
        'react/jsx-boolean-value': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'max-len': ['error', { ignoreComments: true, code: 130 }],
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        // Два правила, чтобы была возможность писать неиспользуемые переменные начиная с _
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' },
        ],

        // Запрещает объявлять (создавать и описывать) новые компоненты в теле другого компонента
        'react/no-unstable-nested-components': 'warn',

        // Правило, которое проверяет, что импорты в рамках одного слайса (слайс, например, entities/User или entities/Profile) должны быть относительными
        'rizespb-fsd/path-checker': ['error', { alias: '@' }],

        // Правило проверяет, что все абсолютные импорты должны осуществляться из public API (index.ts) или из testing.ts (для тестовых данных)
        'rizespb-fsd/public-api-imports': [
            'error',
            {
                alias: '@',
                // Файлы с тестовыми данными (тесты, моки и пр, экспортируемые из testing public API), из которых мы не должны импортировать что-то либо в рабочие файлы с кодом и которые могу
                testFilesPatterns: [
                    '**/*.test.*',
                    '**/*.story.*',
                    '**/StoreDecorator.tsx',
                ],
            },
        ],

        // Правило проверяет, что нижележащие слои (например, fetaures) не должны импортировать из вышележащих (например, из widgets)
        'rizespb-fsd/layer-imports': [
            'error',
            {
                // Используемый в проекте алиас
                alias: '@',
                // Импорты, которые не надо проверять ( в тестовом public API и в StoreProvider из слоя app (часто на других слоях использем IStateSchema))
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        // Максимальное количество пропсов, после которого пропсы переносятся каждый на отдельную строку
        'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    // Переписываем правила Линта для определенных файлов
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                // Отключаем требование переводить текск в тестах
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
}
