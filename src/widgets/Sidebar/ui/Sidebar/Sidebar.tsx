import { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button'
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/ui/Button'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher'
import { SidebarItemList } from 'widgets/Sidebar/model/items'
import cls from './Sidebar.module.scss'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface ISidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: ISidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(
        () => SidebarItemList.map((item) => <SidebarItem item={item} collapsed={collapsed} key={item.path} />),
        [collapsed],
    )

    return (
        <div data-testid="sidebar" className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square={true}
            >
                {collapsed ? '>' : '<'}
            </Button>

            <div className={cls.items}>{itemsList}</div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} short={collapsed} />
            </div>
        </div>
    )
})
