import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AtricleImageBlockComponent.module.scss'

interface IAtricleImageBlockComponentProps {
    className?: string
}

export const AtricleImageBlockComponent = (props: IAtricleImageBlockComponentProps) => {
    const { className } = props
    const { t } = useTranslation()

    return <div className={classNames(cls.atricleImageBlockComponent, {}, [className])}>Hello world!</div>
}
