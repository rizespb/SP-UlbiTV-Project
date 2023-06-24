export { ProfileCard } from './ui/ProfileCard/ProfileCard'
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData'
export { updateProfileData } from './model/services/updateProfileData/updateProfileData'
export { IProfile, IProfileSchema, EValidateProfileError } from './model/types/profile'
export { profileActions, profileReducer } from './model/slice/profileSlice'

// Это не очень правильно. Селекторы надо держат там, где они используются
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading'
export { getProfileData } from './model/selectors/getProfileData/getProfileData'
export { getProfileError } from './model/selectors/getProfileError/getProfileError'
export { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly'
export { getProfileForm } from './model/selectors/getProfileForm/getProfileForm'
export { getProfileValidateErrors } from './model/selectors/getProfileValidateErrors/getProfileValidateErrors'
