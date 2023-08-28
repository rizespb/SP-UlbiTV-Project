import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { NotificationItem } from './NotificationItem'
import { INotification } from '../../model/types/notification'

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />

const notificationItem: INotification = {
    id: 'some-id',
    title: 'Notofication Title',
    description: 'Notofication description',
    href: 'some-url',
}
export const Normal = Template.bind({})
Normal.args = { item: notificationItem }
Normal.decorators = [StoreDecorator({})]
