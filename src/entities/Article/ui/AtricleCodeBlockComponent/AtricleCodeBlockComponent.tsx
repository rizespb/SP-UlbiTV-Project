import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AtricleCodeBlockComponent.module.scss'

interface IAtricleCodeBlockComponentProps {
    className?: string
}

export const AtricleCodeBlockComponent = (props: IAtricleCodeBlockComponentProps) => {
    const { className } = props
    const { t } = useTranslation()

    return <div className={classNames(cls.atricleCodeBlockComponent, {}, [className])}>Hello world!</div>
}
