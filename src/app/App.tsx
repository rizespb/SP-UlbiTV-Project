import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense } from 'react'
import { AppRouter } from './providers/router'

function App() {
    return (
        <div className={classNames('app', {}, [])}>
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
