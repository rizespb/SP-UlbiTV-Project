import React from 'react'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'

export interface ISidebarItemType {
    path: string
    text: string
    Icon: React.VFC<React.SVGProps<SVGElement>>
    authOnly?: boolean
}

export const SidebarItemList: ISidebarItemType[] = [
    { path: RoutePath.main, text: 'Главная', Icon: MainIcon, authOnly: false },
    { path: RoutePath.about, text: 'О сайте', Icon: AboutIcon, authOnly: false },
    { path: RoutePath.profile, text: 'Профиль', Icon: ProfileIcon, authOnly: true },
]
