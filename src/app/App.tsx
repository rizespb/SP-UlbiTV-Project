import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInited, userActions } from 'entities/User'
import { APP_CONTAINER_ID } from 'shared/const/app'
import { AppRouter } from './providers/router'
import { useTheme } from './providers/ThemeProvider'

function App() {
    const dispatch = useDispatch()
    const { theme } = useTheme()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', {}, [theme])} id={APP_CONTAINER_ID}>
            {/* Здесь используем Suspense, т.к. файлы с переводами подгружаются чанками */}
            <Suspense fallback="">
                <Navbar />

                <div className="content-page">
                    <Sidebar />

                    {/*  AppRouеter вначале отрисовывается, а потом в App в useEffect происходит проветка в localStorage: авторизован пользователь или нет. То есть, внчале рисуются роуты, потом проверяется, авторизован ли пользователь. Поэтому все authOnly роуты будут редиректить на главную (как будто пользователь не авторизован). Решили, что будем отрисовывать роуты, только если _inited = true */}
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App
