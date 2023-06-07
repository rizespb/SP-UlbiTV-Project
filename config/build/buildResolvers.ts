import { ResolveOptions } from 'webpack'
import { BuildOptions } from './types/config'

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    // Расширения файлов, для которых при импорте мы не будем указывать расширения
    extensions: ['.tsx', '.ts', '.js'],
    // Абсолютные пути (изначально настроили в TS) в приоритете
    preferAbsolute: true,
    // Импорты из папок src и node_modules считать абсолютными
    modules: [options.paths.src, 'node_modules'],
    // Главный файл модуля - index
    mainFiles: ['index'],
    // Если бы хотели использовать алиасы с @ или др, то надо было бы указать в объекте alias
    // Т.к. используем прямое обращение (shared/...), то пустой объект
    alias: {},
  }
}
