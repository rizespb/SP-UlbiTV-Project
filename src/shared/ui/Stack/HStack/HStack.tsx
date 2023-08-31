import { Flex, IFlexProps } from '../Flex/Flex'

type THStackProps = Omit<IFlexProps, 'direction'>

export const HStack = (props: THStackProps) => (
    <Flex direction="row" {...props} />
)
