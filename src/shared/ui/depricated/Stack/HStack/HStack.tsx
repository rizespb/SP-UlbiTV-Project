import { Flex, IFlexProps } from '../Flex/Flex'

type THStackProps = Omit<IFlexProps, 'direction'>

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const HStack = (props: THStackProps) => (
    <Flex direction="row" {...props} />
)
