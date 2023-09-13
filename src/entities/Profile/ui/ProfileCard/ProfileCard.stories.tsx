import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ECountry } from '@/entities/Country'
import { ECurrency } from '@/entities/Currency'

import AvatarImg from '@/shared/assets/test/storybook.png'
import { ProfileCard } from './ProfileCard'
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator'

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
)

const primaryArgs = {
    data: {
        username: 'admin',
        age: 22,
        country: ECountry.China,
        lastname: 'ulbi tv',
        first: 'asd',
        city: 'asf',
        currency: ECurrency.USD,
        avatar: AvatarImg,
    },
}

export const Primary = Template.bind({})
Primary.args = primaryArgs

// Story-кейс для компонента redesigned
export const PrimaryRedesigned = Template.bind({})
PrimaryRedesigned.args = primaryArgs
PrimaryRedesigned.decorators = [NewDesignDecorator]

export const WithError = Template.bind({})
WithError.args = {
    error: 'Some error',
}

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true,
}
