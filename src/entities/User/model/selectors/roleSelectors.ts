import { createSelector } from '@reduxjs/toolkit'
import { IStateSchema } from '@/app/providers/StoreProvider'
import { EUserRole } from '../consts/consts'

export const getUserRoles = (state: IStateSchema) => state.user.authData?.roles

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(EUserRole.ADMIN)))
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(EUserRole.MANAGER)))
