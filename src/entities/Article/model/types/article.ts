import { IUser } from 'entities/User'

export enum EArticleBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

export interface IArticleBlockBase {
    id: string
    type: EArticleBlockType
}

export interface IArticleCodeBlock extends IArticleBlockBase {
    type: EArticleBlockType.CODE
    code: string
}

export interface IArticleImageBlock extends IArticleBlockBase {
    type: EArticleBlockType.IMAGE
    src: string
    title: string
}

export interface IArticleTextBlock extends IArticleBlockBase {
    type: EArticleBlockType.TEXT
    paragraphs: string[]
    title?: string
}

export type IArticleBlock = IArticleCodeBlock | IArticleImageBlock | IArticleTextBlock

export enum EArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export enum EArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

export interface IArticle {
    id: string
    title: string
    user: IUser
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: EArticleType[]
    blocks: IArticleBlock[]
}
