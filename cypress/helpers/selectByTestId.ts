// хелпер, который помогает получать элементы по test-id
// Вместо:
// cy.get([data-testid=${testId}]).should('exist')
// Можем писать
// cy.get(selectByTestId('MainPage')).should('exist')

export function selectByTestId(testId: string) {
    return `[data-testid=${testId}]`
}
