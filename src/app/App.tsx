import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserInited, initAuthData } from '@/entities/User'
import { AppRouter } from './providers/router'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { PageLoader } from '@/widgets/PageLoader'
import { ToggleFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'

function App() {
    const dispatch = useAppDispatch()
    const { theme } = useTheme()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    if (!inited) {
        return <PageLoader />
    }

    return (
        // Сделали редизайн
        // У некоторых пользователей будет новый дизайн
        // А некоторых оставим старый
        // Регулируется с помощью ФТ isAppRedesigned
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className={classNames('app', {}, [theme])}>
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
                <div className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                        />
                    </Suspense>
                </div>
            }
        />
    )
}

export default App
