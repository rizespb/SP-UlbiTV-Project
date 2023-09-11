import { TDropdownDirection } from '../../../../types/ui'
import cls from './popup.module.scss'

export const mapDirectionClass: Record<TDropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
}
