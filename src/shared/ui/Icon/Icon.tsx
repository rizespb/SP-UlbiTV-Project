import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IIconProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGElement>>
}

export const Icon = (props: IIconProps) => {
    const { className, Svg } = props

    return <Svg className={classNames(cls.icon, {}, [className])} />
}
