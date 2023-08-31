import { memo, ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, ECardTheme } from '../Card/Card'
import cls from './Tabs.module.scss'

export interface ITabItem {
    value: string
    content: ReactNode
}

interface ITabsProps {
    className?: string
    tabs: ITabItem[]
    // выбранное значение
    value: string
    onTabClick: (tab: ITabItem) => void
}

export const Tabs = memo((props: ITabsProps) => {
    const { className, tabs, onTabClick, value } = props

    const clickHandle = useCallback(
        (tab: ITabItem) => () => {
            onTabClick(tab)
        },
        [onTabClick],
    )

    return (
        <div className={classNames(cls.tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={
                        tab.value === value
                            ? ECardTheme.NORMAL
                            : ECardTheme.OUTLINED
                    }
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
})
