import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg'
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg'
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg'
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg'

import MainIcon from '@/shared/assets/icons/home.svg'
import ArticleIcon from '@/shared/assets/icons/article.svg'
import AboutIcon from '@/shared/assets/icons/Info.svg'
import ProfileIcon from '@/shared/assets/icons/avatar.svg'
import SettingsIcon from '@/shared/assets/icons/burger.svg'

import { ISidebarItemType } from '../types/sidebar'
import {
    getRouteAbout,
    getRouteMain,
    getRouteArticles,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router'
import { toggleFeatures } from '@/shared/lib/features'

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData)

    const sidebarItemsList: ISidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
            text: 'О сайте',
        },
    ]

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                text: 'Статьи',
                authOnly: true,
            },
            {
                path: getRouteSettings(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => SettingsIcon,
                    on: () => SettingsIcon,
                }),
                text: 'Настройки',
                authOnly: true,
            },
        )
    }

    return sidebarItemsList
}
