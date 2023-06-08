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
