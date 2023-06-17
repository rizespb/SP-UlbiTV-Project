import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from 'entities/User'
import { APP_CONTAINER_ID } from 'shared/const/app'
import { AppRouter } from './providers/router'
import { useTheme } from './providers/ThemeProvider'

function App() {
    const dispatch = useDispatch()
    const { theme } = useTheme()

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

                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
