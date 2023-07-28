import { MutableRefObject, ReactNode, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
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

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    })

    return (
        <section ref={wrapperRef} className={classNames(cls.page, {}, [className])}>
            {children}
            {/* Этот div для useInfiniteScroll - при достижении конца страницы  будет вызван onScrollEnd (например, при подгрузке списка статей) */}
            <div ref={triggerRef}/>
        </section>
    )
}
