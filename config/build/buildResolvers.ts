import { ResolveOptions } from 'webpack'

export function buildResolvers(): ResolveOptions {
  return {
    // Расширения файлов, для которых при импорте мы не будем указывать расширения
    extensions: ['.tsx', '.ts', '.js'],
  }
}
