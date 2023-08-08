import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { getUserAuthData } from 'entities/User'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, EButtonTheme } from 'shared/ui/Button'
import { HStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className } = props

    const { t } = useTranslation('profile')

    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)

    // Если id профайла, который просматриваем, и id авторизованного пользователя совпадают, значит просматриваем профиль текущего пользователя. Можно отобразить кнопку Редиктировать и пр.
    const canEdit = authData?.id === profileData?.id

    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadonly)

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {canEdit && (
                <div>
                    {readonly ? (
                        <Button theme={EButtonTheme.OUTLINE} onClick={onEdit}>
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button theme={EButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                                {t('Отменить')}
                            </Button>
                            <Button theme={EButtonTheme.OUTLINE} onClick={onSave}>
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    )
}
