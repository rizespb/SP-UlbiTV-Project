import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { NotificationList } from './NotificationList'
// import withMock from 'storybook-addon-mock'

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // @TODO-Storybook Не получилось настроить моки запросов с помощью storybook-addon-mock
    // попробовать после обновления storybook до актуальной версии
    // Декоратор, которые мокает запросы api (storybook-addon-mock)
    // Ниже надо указать mockData в parameters
    // decorators: [
    //     withMock,
    // ],
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]

// Моки запросов api
// @TODO-Storybook Не получилось настроить моки запросов с помощью попробовать после обновления storybook до актуальной версии
// Normal.parameters = {
//     mockData: [
//         {
//             url: `${__API__}/notifications`,
//             method: 'GET',
//             status: 200,
//             response: [
//                 {
//                     id: '1',
//                     title: 'Уведомление',
//                     description: 'Поставь лайк и оставь комментарий под Ulbi TV',
//                 },
//                 {
//                     id: '2',
//                     title: 'Уведомление 2',
//                     description: 'Поставь лайк и оставь комментарий под Ulbi TV',
//                 },
//                 {
//                     id: '3',
//                     title: 'Уведомление 3',
//                     description: 'Поставь лайк и оставь комментарий под Ulbi TV',
//                 },
//             ],
//         },
//     ],
// }
