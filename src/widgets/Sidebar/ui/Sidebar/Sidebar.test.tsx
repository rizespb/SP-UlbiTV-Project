import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender/componentRender'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
    test('Test render', () => {
        componentRender(<Sidebar />)

        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('Test toggle', () => {
        componentRender(<Sidebar />)

        const toggleButton = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleButton)

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})
