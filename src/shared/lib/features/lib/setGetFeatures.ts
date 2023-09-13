import { FeatureFlags } from '@/shared/types/featureFlags'

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
// то есть мы не подписываем Реакт на изменение фичтогглов
// Для хранения информации будет использоваться просто глобальная переменная

// ФТ хранятся в глобальной переменной featureFlags - они не реактивны, при изменении ФТ интерфейс не перерисовывается как в случае хранения данных в Redux или локальном стейте
// Например, если у пользователя был isAppRedesigned=true и он разлогинился, то интерфейс ломается
// Для этого создали костыль ForceUpdateProvider
let featureFlags: FeatureFlags = {}

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags
    }
}

// Возвращает ФТ по ключу
export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag]
}

// Возвращает все ФТ
export function getAllFeatureFlags() {
    return featureFlags
}
