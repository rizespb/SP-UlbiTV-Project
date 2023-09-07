import { memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    Button,
    EButtonSize,
    EButtonTheme,
} from '@/shared/ui/depricated/Button'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { VStack } from '@/shared/ui/depricated/Stack'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import cls from './Sidebar.module.scss'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppLogo } from '@/shared/ui/depricated/AppLogo'

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
        () =>
            sidebarItemList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemList],
    )

    return (
        // Сделали редизайн
        // У некоторых пользователей будет новый дизайн
        // А некоторых оставим старый
        // Регулируется с помощью ФТ isAppRedesigned
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo className={cls.appLogo} />
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.Sidebar,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
                >
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

                    <VStack role="navigation" gap="8" className={cls.items}>
                        {itemsList}
                    </VStack>

                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
                </aside>
            }
        />
    )
})
