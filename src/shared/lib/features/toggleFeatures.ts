import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from './setGetFeatures'

interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags
    on: () => T
    off: () => T
}

// Функция, которая возвращает резульатт вызова функций on или off в зависимости от состояние фичтоггла
// Предназанчена для автоматизации работы с ФТ, чтобы потом их можно было легко удалить с помощью скрипта scripts\remove-feature.ts
// Пример исполдьзования:
// если ФТ включен, то возвращаем новый компонент (например, CounterRedesigned)
// если ФТ вsключен, то возвращаем старый компонент (например, Counter)
// После того, как CounterRedesigned будет оттестирован, с помощью скрипта remove-feature.ts удалим все использования старого Counter
export function toggleFeatures<T>({
    off,
    on,
    name,
}: ToggleFeaturesOptions<T>): T {
    if (getFeatureFlag(name)) {
        return on()
    }

    return off()
}
