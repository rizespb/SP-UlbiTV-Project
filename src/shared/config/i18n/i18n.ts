import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
// Далее идет подключение плагинов
// Загружаем переводы с нашего сервера чанками
    .use(Backend)
// Определяем язык пользователя
    .use(LanguageDetector)
// передаем экземпляр i18n в react-i18next
    .use(initReactI18next)
// Инициализация
// for all options read: https://www.i18next.com/overview/configuration-options
    .init({
    // язык по-умолчанию
        fallbackLng: 'ru',
        // Вывод информации о происходящем в консоль в режиме Dev
        // __IS_DEV__ создается с помощью webpack.DefinePlugin
        debug: !!__IS_DEV__,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {
            // Путь к папке с переводами в public (вроде бы, работает и без него)
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    })

export default i18n
