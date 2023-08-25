import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { [FTName] } from './[FTName]';

export default {
   title: 'shared/[FTName]',
   component: [FTName],
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof [FTName]>;

const Template: ComponentStory<typeof [FTName]> = (args) => <[FTName] { ...args } />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]

