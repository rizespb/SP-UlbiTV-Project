import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage'
import { FeatureFlags } from '@/shared/types/featureFlags'

// Начальные значения ФТ, пока не получены значения jsonSettings с бэка
const defaultFeatures: FeatureFlags = {
    // Мы в initAuthData сохраняем последний выбранный дизайн в localStorage, чтобы при следующем заходе во время инициализации приложения знать, какой дизайн показывать: новый или старый
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
}

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
// то есть мы не подписываем Реакт на изменение фичтогглов
// Для хранения информации будет использоваться просто глобальная переменная

// ФТ хранятся в глобальной переменной featureFlags - они не реактивны, при изменении ФТ интерфейс не перерисовывается как в случае хранения данных в Redux или локальном стейте
// Например, если у пользователя был isAppRedesigned=true и он разлогинился, то интерфейс ломается
// Для этого создали костыль ForceUpdateProvider
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
}

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
