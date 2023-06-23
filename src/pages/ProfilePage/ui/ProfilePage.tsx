import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ECurrency } from 'entities/Currency'
import { ECountry } from 'entities/Country'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

const asyncReducers: TReducerLIst = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readOnly = useSelector(getProfileReadonly)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

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
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader />

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
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
