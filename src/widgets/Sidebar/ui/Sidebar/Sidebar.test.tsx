import { fireEvent, screen } from '@testing-library/react'
import { renderWithTraslation } from 'shared/lib/tests/renderWithTraslation'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
    test('Test render', () => {
        renderWithTraslation(<Sidebar />)

        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('Test toggle', () => {
        renderWithTraslation(<Sidebar />)

        const toggleButton = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleButton)

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})
