import { Theme } from '@/shared/const/theme'

export interface IJsonSettings {
    theme?: Theme
    isFirstVisit?: boolean

    // Была ли уже открыта приветственная модалка ArticlePageGreeting
    // Открывается один раз при первом заходе в приложение
    isArticlesPageWasOpened?: boolean
}
