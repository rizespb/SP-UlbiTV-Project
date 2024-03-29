import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserInited, initAuthData } from '@/entities/User'
import { AppRouter } from './providers/router'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ToggleFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout'
import { PageLoader } from '@/widgets/PageLoader'
import { useAppToolbar } from './lib/useAppToolbar'
import { withTheme } from './providers/ThemeProvider/ui/withTheme'

function App() {
    const dispatch = useAppDispatch()
    const { theme } = useTheme()
    const inited = useSelector(getUserInited)

    // toolbar - это панель справа на странице у самого правого края
    // В зависимости от текущей страницы получаем или нужный toolbar (в нашем приложении это кнопка скролла наверх ScrollToolbar) или undefined, если на текущей странице не должно быть toolbar
    const toolbar = useAppToolbar()

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData())
        }
    }, [dispatch, inited])

    if (!inited) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    // Обрачиваем в div с классом темы, чтобы в скелетоне поддерживались цвета из выбранной темы
                    <div
                        id="app"
                        className={classNames('app_redesigned', {}, [theme])}
                    >
                        <AppLoaderLayout />
                    </div>
                }
                off={<PageLoader />}
            />
        )
    }

    return (
        // Сделали редизайн
        // У некоторых пользователей будет новый дизайн
        // А некоторых оставим старый
        // Регулируется с помощью ФТ isAppRedesigned
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    {/* Здесь используем Suspense, т.к. файлы с переводами подгружаются чанками */}
                    <Suspense fallback="">
                        <Navbar />

                        <div className="content-page">
                            <Sidebar />

                            {/*  AppRouеter вначале отрисовывается, а потом в App в useEffect происходит проветка в localStorage: авторизован пользователь или нет. То есть, внчале рисуются роуты, потом проверяется, авторизован ли пользователь. Поэтому все authOnly роуты будут редиректить на главную (как будто пользователь не авторизован). Решили, что будем отрисовывать роуты, только если _inited = true */}
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    )
}

export default withTheme(App)
