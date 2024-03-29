import { memo, ReactNode, useCallback, useEffect } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    AnimationProvider,
    useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider'
import { Overlay } from '../../redesigned/Overlay/Overlay'
import cls from './Drawer.module.scss'
import { Portal } from '../../redesigned/Portal/Portal'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { toggleFeatures } from '@/shared/lib/features'

interface IDrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const height = window.innerHeight - 100

// Шторка-модалка для мобильных экранов
// Сильно не разбирали, как именно работают @use-gesture/react и @react-spring/web. Упор на линивую загрузку библиотек
// Ссылка на документацию https://use-gesture.netlify.app/docs/gestures/
// https://codesandbox.io/s/github/pmndrs/use-gesture/tree/main/demo/src/sandboxes/action-sheet?file=/src/App.jsx
const DrawerContent = memo((props: IDrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs()
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }))
    const { theme } = useTheme()
    const { className, children, onClose, isOpen, lazy } = props

    // Неп
    // Запсукаем анимацию на открытие Drawer
    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false })
    }, [api])

    useEffect(() => {
        if (isOpen) {
            openDrawer()
        }
    }, [api, isOpen, openDrawer])

    // Запсукаем анимацию на закрытие Drawer
    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        })
    }

    // bind содержит handler-ы для drag-n-drop (onDrag, onDrop и т.д.)
    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel()

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close()
                } else {
                    openDrawer()
                }
            } else {
                api.start({ y: my, immediate: true })
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    )

    if (!isOpen) {
        return null
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'))

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.drawer, {}, [
                    className,
                    theme,
                    'app_drawer',
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.drawerNew,
                        off: () => cls.drawerOld,
                    }),
                ])}
            >
                <Overlay onClick={close} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    )
})

const DrawerAsync = (props: IDrawerProps) => {
    const { isLoaded } = useAnimationLibs()

    // Drawer окно всегда встроено в Виртуальный дом. С помощью CSS:
    // opacity: 0;
    // pointer-events: none;
    // z-index: -1;
    // мы полностью ее скрываем ПОД остальным сайтом. Но тогда инпут сразу присутствует в ДОМ. И при клике на кнопку Войти он не получает фокус (автофокус устанавливается при первоначальном рендере)

    if (!isLoaded) {
        // Можно возвращать скелетон или лоадер
        return null
    }

    return <DrawerContent {...props} />
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Drawer = (props: IDrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
)
