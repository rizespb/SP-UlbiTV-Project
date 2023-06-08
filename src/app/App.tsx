import { classNames } from 'shared/lib/classNames/classNames'
import { useTheme } from 'app/providers/ThemeProvider'
import './styles/index.scss'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/NavBar'
import { Sidebar } from 'widgets/Sidebar'

const App = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />

      <div className="content-page">
        <Sidebar />

        <AppRouter />
      </div>
    </div>
  )
}

export default App
