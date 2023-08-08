import { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, EButtonSize, EButtonTheme } from 'shared/ui/Button'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/ThemeSwitcher'
import { useSelector } from 'react-redux'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import cls from './Sidebar.module.scss'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface ISidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: ISidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const sidebarItemList = useSelector(getSidebarItems)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(
        () => sidebarItemList.map((item) => <SidebarItem item={item} collapsed={collapsed} key={item.path} />),
        [collapsed, sidebarItemList],
    )

    return (
        <menu data-testid="sidebar" className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={EButtonTheme.BACKGROUND_INVERTED}
                size={EButtonSize.L}
                square={true}
            >
                {collapsed ? '>' : '<'}
            </Button>

            <VStack gap="8" className={cls.items}>
                {itemsList}
            </VStack>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} short={collapsed} />
            </div>
        </menu>
    )
})
