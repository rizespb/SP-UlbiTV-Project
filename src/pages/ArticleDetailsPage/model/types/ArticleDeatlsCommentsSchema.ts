import { EntityState } from '@reduxjs/toolkit'
import { IComment } from '@/entities/Comment'

// EntityState состоит из поля ids: string[] и entities: Record< string (id), T (например, IComment)> - по сути entities - это словарь, где ключами являются id
export interface IArticleDeatlsCommentsSchema extends EntityState<IComment> {
    isLoading?: boolean
    error?: string
}
