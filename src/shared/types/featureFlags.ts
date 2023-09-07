export interface FeatureFlags {
    isArticleRatingEnabled?: boolean
    isCounterEnabled?: boolean

    // В определенный момент сделали редизайн приложения
    // Решили, что у некоторых пользователей будет новый дизайн
    // А некоторых оставим старый
    isAppRedesigned?: boolean
}
