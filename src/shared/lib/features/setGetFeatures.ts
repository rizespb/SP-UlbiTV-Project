import { FeatureFlags } from '@/shared/types/featureFlags'

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
// то есть мы не подписываем Реакт на изменение фичтогглов
// Для хранения информации будет сипользоваться просто глобальная переменная
let featureFlags: FeatureFlags

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag]
}
