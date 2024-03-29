const interfaceConst = 'interface'
const firstCharLowerCase = require('../firstCharLowerCase')

module.exports = (componentName) => `import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './${componentName}.module.scss'

${interfaceConst} I${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: I${componentName}Props) => {
    const { className } = props
    const { t } = useTranslation()
    
    return (
        <div className={classNames(cls.${firstCharLowerCase(componentName)}, {}, [className])}>
           Hello world
        </div>
    )
})`
