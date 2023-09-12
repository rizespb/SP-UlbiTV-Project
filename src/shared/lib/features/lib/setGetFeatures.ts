import { FeatureFlags } from '@/shared/types/featureFlags'

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
// то есть мы не подписываем Реакт на изменение фичтогглов
// Для хранения информации будет сипользоваться просто глобальная переменная
let featureFlags: FeatureFlags = {}

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags
    }
}

// Возвращает ФТ по ключу
export function getFeatureFlag(flag: keyof FeatureFlags) {
    // ?? true - временная заглушка, чтобы возвращать новый дизайн по ФТ isAppRedesigned для неавторизованного пользователя (jsonSettings с бэка не получили, пока не авторизуется)
    return featureFlags[flag] ?? true
}

// Возвращает все ФТ
export function getAllFeatureFlags() {
    return featureFlags
}
