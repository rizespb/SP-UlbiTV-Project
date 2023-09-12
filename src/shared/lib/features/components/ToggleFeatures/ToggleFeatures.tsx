import { ReactElement } from 'react'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from '../../lib/setGetFeatures'

interface ToggleFeaturesProps {
    // название фич-тоггла
    feature: keyof FeatureFlags

    // Компонент, отображаемый, если ФТ включен
    on: ReactElement

    // Компонент, отображаемый, если ФТ выключен
    off: ReactElement
}

// Компонент для рендера on и off компонентов в зависимоти от фича-тоггла
// Работает почти так же, как функция toggleFeatures
// Функцию toggleFeatures будем использовать для всех значений, кроме рендера компонентов (текст, хелперы и т.д.)
// on и off компоненты будем оборачивать в компонент ToggleFeatures
export const ToggleFeatures = (props: ToggleFeaturesProps) => {
    const { on, off, feature } = props

    if (getFeatureFlag(feature)) {
        return on
    }

    return off
}
