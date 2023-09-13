import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'

interface IEditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = memo(
    (props: IEditableProfileCardHeaderProps) => {
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
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" fullWidth border="partialBorder">
                        <HStack
                            max
                            justify="between"
                            className={classNames('', {}, [className])}
                        >
                            <Text title={t('Профиль')} />
                            {canEdit && (
                                <div>
                                    {readonly ? (
                                        <Button
                                            onClick={onEdit}
                                            data-testid="EditableProfileCardHeader.EditButton"
                                        >
                                            {t('Редактировать')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                data-testid="EditableProfileCardHeader.CancelButton"
                                                color="error"
                                            >
                                                {t('Отменить')}
                                            </Button>

                                            <Button
                                                onClick={onSave}
                                                data-testid="EditableProfileCardHeader.SaveButton"
                                                color="success"
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        </HStack>
                                    )}
                                </div>
                            )}
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        max
                        justify="between"
                        className={classNames('', {}, [className])}
                    >
                        <TextDeprecated title={t('Профиль')} />
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <ButtonDeprecated
                                        theme={EButtonTheme.OUTLINE}
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                ) : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            theme={EButtonTheme.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                        >
                                            {t('Отменить')}
                                        </ButtonDeprecated>

                                        <ButtonDeprecated
                                            theme={EButtonTheme.OUTLINE}
                                            onClick={onSave}
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                        >
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                }
            />
        )
    },
)
