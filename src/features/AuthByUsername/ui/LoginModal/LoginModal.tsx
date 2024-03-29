import { Suspense } from 'react'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal className={className} isOpen={isOpen} onClose={onClose} lazy={true}>
        <Suspense fallback={<Loader />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
)
