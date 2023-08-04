// 'development' - для сборки во время разрабоки
// 'production' - сборка для деплоя на сервер
export type BuildMode = 'production' | 'development'

export interface BuildPath {
    entry: string
    // путь к папке со сборкой
    build: string
    // путь к index.html
    html: string
    // путь к папке src:
    src: string
    // путь до файлов с переводами
    locales: string
    // в какую папку при билде помещать переводы
    buildLocales: string
}

export interface BuildEnv {
    mode: BuildMode
    port: number
    apiUrl: string
}

export interface BuildOptions {
    mode: BuildMode
    paths: BuildPath
    isDev: boolean
    port: number
    apiUrl: string

    // Для того, что переопределять конфиги для каждой из сред
    project: 'frontend' | 'storybook' | 'jest'
}
