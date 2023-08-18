import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, EAppLinkTheme } from '@/shared/ui/AppLink/AppLink'
import { ISidebarItemType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'

interface ISidebarItemProps {
    item: ISidebarItemType
    collapsed: boolean
}

export const SidebarItem = memo((props: ISidebarItemProps) => {
    const { item, collapsed } = props
    const { t } = useTranslation()

    const isAuth = useSelector(getUserAuthData)

    if (item.authOnly && !isAuth) {
        return null
    }

    return (
        <AppLink
            theme={EAppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            <item.Icon className={cls.icon} />

            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    )
})
