import {
    EValidateProfileError,
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ECurrency } from 'entities/Currency'
import { ECountry } from 'entities/Country'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, ETextTheme } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useParams } from 'react-router-dom'
import { Page } from 'widgets/Page/Page'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

const asyncReducers: TReducerLIst = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readOnly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)
    const { id } = useParams<{ id: string }>()

    const validateErrorsTranslates = {
        [EValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [EValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [EValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [EValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [EValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    }

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
        }
    })

    const onChangeFirstname = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ first: value || '' }))
        },
        [dispatch],
    )
    const onChangeLastname = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }))
        },
        [dispatch],
    )
    const onChangeAge = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value) || 0 }))
        },
        [dispatch],
    )
    const onChangeCity = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }))
        },
        [dispatch],
    )
    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }))
        },
        [dispatch],
    )
    const onChangeAvatar = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }))
        },
        [dispatch],
    )
    const onChangeCurrency = useCallback(
        (currency: ECurrency) => {
            dispatch(profileActions.updateProfile({ currency }))
        },
        [dispatch],
    )
    const onChangeCountry = useCallback(
        (country: ECountry) => {
            dispatch(profileActions.updateProfile({ country }))
        },
        [dispatch],
    )

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers} removeAfterUnmount>
            <Page className={classNames('', {}, [className])}>
                <ProfilePageHeader />

                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <Text theme={ETextTheme.ERROR} text={validateErrorsTranslates[err]} key={err} />
                    ))}

                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readOnly={readOnly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
