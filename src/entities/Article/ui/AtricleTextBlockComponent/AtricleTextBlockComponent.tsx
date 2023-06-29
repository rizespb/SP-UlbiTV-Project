import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AtricleTextBlockComponent.module.scss'

interface IAtricleTextBlockComponentProps {
    className?: string
}

export const AtricleTextBlockComponent = (props: IAtricleTextBlockComponentProps) => {
    const { className } = props
    const { t } = useTranslation()

    return <div className={classNames(cls.atricleTextBlockComponent, {}, [className])}>Hello world!</div>
}
