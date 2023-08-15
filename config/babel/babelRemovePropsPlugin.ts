import { PluginItem } from '@babel/core'

// Самописный плагин для удаления data-testid из кода
// Работает с нодами АСТ
export default function (): PluginItem {
    return {
        visitor: {
            // Program - название ноды из AST-дерева
            Program(path, state) {
                // state.opts.props - сюда попадут переданные в плагин список аттрибутов для удаления
                // Например, так babelPlugin(['data-testid', 'test-atr'])
                const forbidden = state.opts.props || []

                path.traverse({
                    // Указываем тип ноды, который мы ищем
                    // JSXIdentifier - это аттрибут
                    JSXIdentifier(current) {
                        // Получаем имя аттрибута
                        const nodeName = current.node.name

                        // Если имя ноды входит в массив forbidden, то удаляем эту ноду
                        if (forbidden.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    },
                })
            },
        },
    }
}
