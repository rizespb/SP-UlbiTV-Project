import { Story } from '@storybook/react'
import '@/app/styles/index.scss'

// В данном случае декоратор пустой - он ничего не делает - возвращает JSX истории
// Мы используем его для того, чтобы подключить глобальные стили на второй стро
export const StyleDecorator = (StoryComponent: Story) => <StoryComponent />
