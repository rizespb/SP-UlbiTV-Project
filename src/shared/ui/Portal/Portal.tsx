import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
    element: HTMLElement | null
}

export const Portal = (props: PortalProps) => {
    const { children, element } = props

    return createPortal(children, element || document.body)
}
