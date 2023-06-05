// 'development' - для сборки во время разрабоки
// 'production' - сборка для деплоя на сервер
export type BuildMode = 'production' | 'development'

export interface BuildPath {
  entry: string
  // путь к папке со сборкой
  build: string
  // путь к index.html
  html: string
}

export interface BuildEnv {
  mode: BuildMode
  port: number
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPath
  isDev: boolean
  port: number
}
