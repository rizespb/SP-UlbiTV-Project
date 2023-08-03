import { IStateSchema } from 'app/providers/StoreProvider'
import { getUIScrollByPath, uiActions } from 'features/UI'
import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import cls from './Page.module.scss'

interface IPageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const Page = (props: IPageProps) => {
    const { className, children, onScrollEnd } = props
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: IStateSchema) => getUIScrollByPath(state, pathname))

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    })

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    // Сохранение позиции скролла для каждой страницы
    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
        dispatch(
            uiActions.setScrollPosition({
                position: event.currentTarget.scrollTop,
                path: pathname,
            }),
        )
    }, 500)

    return (
        <section ref={wrapperRef} className={classNames(cls.page, {}, [className])} onScroll={onScroll}>
            {children}
            {/* Этот div для useInfiniteScroll - при достижении конца страницы  будет вызван onScrollEnd (например, при подгрузке списка статей) */}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </section>
    )
}