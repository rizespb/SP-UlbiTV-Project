import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import {
    DynamicModuleLoader,
    TReducerLIst,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from '@/shared/ui/redesigned/Stack'
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice'
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors'
import cls from './AddCommentForm.module.scss'
import { Button } from '@/shared/ui/redesigned/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'

export interface IAddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const asyncReducers: TReducerLIst = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo((props: IAddCommentFormProps) => {
    const { className, onSendComment } = props
    const { t } = useTranslation()
    const text = useSelector(getAddCommentFormText)
    const error = useSelector(getAddCommentFormError)
    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value))
        },
        [dispatch],
    )

    const onSendHandler = useCallback(() => {
        // Здесь передаем пустую строку, если текста нет. А в санках мы проверяем это, и если пустая строка, то ничего не отправим на сервер
        onSendComment(text || '')
        onCommentTextChange('')
    }, [onCommentTextChange, onSendComment, text])

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" border="partialBorder" fullWidth>
                        <HStack
                            data-testid="AddCommentForm"
                            justify="between"
                            max
                            gap="16"
                            className={classNames(
                                cls.AddCommentFormRedesigned,
                                {},
                                [className],
                            )}
                        >
                            <Input
                                className={cls.input}
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                data-testid="AddCommentForm.Input"
                                onChange={onCommentTextChange}
                            />
                            <Button
                                data-testid="AddCommentForm.Button"
                                onClick={onSendHandler}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        data-testid="AddCommentForm"
                        justify="between"
                        max
                        className={classNames(cls.AddCommentForm, {}, [
                            className,
                        ])}
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            data-testid="AddCommentForm.Input"
                            onChange={onCommentTextChange}
                        />
                        <ButtonDeprecated
                            data-testid="AddCommentForm.Button"
                            theme={EButtonTheme.OUTLINE}
                            onClick={onSendHandler}
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    )
})

export default AddCommentForm
