import { MutableRefObject, useEffect, useRef } from 'react'

export interface IUseInfiniteScrollOptions {
    callback?: () => void
    triggerRef: MutableRefObject<HTMLElement>
    wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: IUseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        const wrapperElement = wrapperRef.current
        const triggerElement = triggerRef.current

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            }

            // Пенрвый агрумент - массив элементов, за которыми мы наблюдаем (мы будем наблюдать за одним - первым)
            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            observer.current.observe(triggerElement)
        }

        return () => {
            if (observer.current && triggerElement) {
                observer.current.unobserve(triggerElement)
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
