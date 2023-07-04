import React from 'react'

export interface ISidebarItemType {
    path: string
    text: string
    Icon: React.VFC<React.SVGProps<SVGElement>>
    authOnly?: boolean
}
