// Для того, чтобы TS могут импортировать стили объектом из css-модулей
// Пример: import classes from './Counter.module.scss'
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }

  const classNames: IClassNames
  export = classNames
}
