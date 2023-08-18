import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './User.module.scss'

interface UserProps {
    className?: string
}

export const User = ({ className }: UserProps) => (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={classNames(cls.User, {}, [className])}>User</div>
)
