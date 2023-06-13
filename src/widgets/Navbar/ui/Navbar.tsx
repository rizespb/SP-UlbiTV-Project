import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button'
import { ButtonTheme } from 'shared/ui/Button/ui/Button'
import { Modal } from 'shared/ui/Modal'
import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModel, setIsAuthModel] = useState(false)

    const onToggleModal = useCallback(() => {
        setIsAuthModel((prev) => !prev)
    }, [])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>

            <Modal isOpen={isAuthModel} onClose={onToggleModal}>
                {t(
                    // eslint-disable-next-line max-len
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad nulla ab at? Rem, soluta eos. Fugit voluptas, dolorem eos eius laudantium qui? Nesciunt perspiciatis debitis eaque quaerat maiores assumenda corrupti.',
                )}
            </Modal>
        </div>
    )
}
