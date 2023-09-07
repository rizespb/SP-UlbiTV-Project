import { Flex, IFlexProps } from '../Flex/Flex'

type TVStackProps = Omit<IFlexProps, 'direction'>

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const VStack = (props: TVStackProps) => {
    const { align = 'start' } = props

    return <Flex {...props} direction="column" align={align} />
}
