import { ReactElement } from 'react'
import { AppRoutes } from '@/shared/const/router'
import { ScrollToolbar } from '@/widgets/ScrollToolbar'
import { useRouteChange } from '@/shared/lib/router/useRouteChange'

export function useAppToolbar() {
    // Получаем текущий ulr (текущий маршрут), сопоставленный со значением enum AppRoutes
    const appRoute = useRouteChange()

    // Список страниц, для которых используется ScrollToolbar (кнопка скролла наверх страницы)
    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    }

    // Возвращаем ScrollToolbar или undefined, если на текущей странице не должно быть кнопки скролла наверх ScrollToolbar
    return toolbarByAppRoute[appRoute]
}
