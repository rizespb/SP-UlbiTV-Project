import { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    // То, что отображается в момент загрузки
    fallback?: ReactElement
    // Запасное изображение на случай, если произошла ошибка загрузки
    errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
    const { className, src, alt = 'image', errorFallback, fallback, ...otherProps } = props
    // Изображение еще загружается или уже загрузилось
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const img = new Image()
        img.src = src ?? ''
        img.onload = () => {
            setIsLoading(false)
        }
        img.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [src])

    if (isLoading && fallback) {
        return fallback
    }

    if (hasError && errorFallback) {
        return errorFallback
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />
})
