// Для того, чтобы TS могут импортировать стили объектом из css-модулей
// Пример: import classes from './Counter.module.scss'
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }

    const classNames: IClassNames
    export = classNames
}

// Чтобы TS умел работать с импортами svg и png / jpeg
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare module '*.svg' {
    import React from 'react'

    const SVG: React.VFC<React.SVGProps<SVGElement>>
    export default SVG
}

declare const __IS_DEV__: boolean
declare const __API__: string
declare const __PROJECT__: 'frontend' | 'storybook' | 'jest'

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T
