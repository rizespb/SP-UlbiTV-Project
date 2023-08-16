import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IIconProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGElement>>
    inverted?: boolean
}

export const Icon = (props: IIconProps) => {
    const { className, Svg, inverted } = props

    return <Svg className={classNames(inverted ? cls.inverted : cls.icon, {}, [className])} />
}
