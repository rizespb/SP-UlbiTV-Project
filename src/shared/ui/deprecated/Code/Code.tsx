import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import CopyIcon from '../../../assets/icons/copy-20-20.svg'
import { Button, EButtonTheme } from '../Button'
import cls from './Code.module.scss'

interface ICodeProps {
    className?: string
    text: string
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Code = (props: ICodeProps) => {
    const { className, text } = props

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={classNames(cls.code, {}, [className])}>
            <Button
                onClick={onCopy}
                className={cls.copyBtn}
                theme={EButtonTheme.CLEAR}
            >
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    )
}
