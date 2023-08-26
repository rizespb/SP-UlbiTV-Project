import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ECountry } from '@/entities/Country'
import { ECurrency } from '@/entities/Currency'

import AvatarImg from '@/shared/assets/test/storybook.png'
import { ProfileCard } from './ProfileCard'

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
    data: {
        username: 'admin',
        age: 36,
        country: ECountry.China,
        first: 'Ivan',
        lastname: 'Ivanov',
        city: 'Moscow',
        currency: ECurrency.USD,
        avatar: AvatarImg,
    },
}

export const WithError = Template.bind({})
WithError.args = {
    error: 'Some error',
}

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true,
}
