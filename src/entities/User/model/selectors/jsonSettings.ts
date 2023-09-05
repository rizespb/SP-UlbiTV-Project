import { buildSelector } from '@/shared/lib/store'
import { IJsonSettings } from '../types/jsonSettings'

const defaultJsonSettings: IJsonSettings = {}

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
)
