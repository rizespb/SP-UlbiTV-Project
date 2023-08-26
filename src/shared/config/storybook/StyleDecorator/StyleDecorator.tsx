import { Story } from '@storybook/react'
// eslint-disable-next-line rizespb-fsd/layer-imports
import '@/app/styles/index.scss'

// В данном случае декоратор пустой - он ничего не делает - возвращает JSX истории
// Мы используем его для того, чтобы подключить глобальные стили на второй стро
export const StyleDecorator = (StoryComponent: Story) => (
    // В проекте темизация реализована немного по другому, чем у Ulbi
    // Поэтому сам добавил этот div для того, чтобы при изменении темы в сторибук менялся и бэкграунд
    // Класс app из @/app/styles/index.scss содержит только цвет фона и высоту
    // Сами классы с темами (в которых определяются значения переменных с цветами) навешиваются с помощью storybook-addon-themes, подключаемого в main.ts и preview.ts
    <div className="app">
        <StoryComponent />
    </div>
)
