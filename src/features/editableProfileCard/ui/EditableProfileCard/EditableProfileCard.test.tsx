import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { IProfile } from '@/entities/Profile'
import { ECurrency } from '@/entities/Currency'
import { ECountry } from '@/entities/Country'
import { $api } from '@/shared/api/api'
import { profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCard } from './EditableProfileCard'

const profile: IProfile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: ECurrency.USD,
    country: ECountry.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
}

// Начальный стейт В Redux
const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        // id в authData должен совпадать с id в profile, чтобы мы могли редактировать статью
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
}

describe('features/EditableProfileCard', () => {
    test('Режим рид онли должен переключиться', async () => {
        componentRender(<EditableProfileCard id="1" />, options)

        // Нажимае на кнопку редактировать
        // Начиная с определенного момента userEvent стал асинхронным
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        )

        // Должна появиться кнопка Отменить
        expect(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        ).toBeInTheDocument()
    })

    test('При отмене значения должны обнуляться', async () => {
        componentRender(<EditableProfileCard id="1" />, options)
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        )

        // Очищаем значения в интпутах Имя и Фамилия
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

        // Печатаем в интпутах Имя и Фамилия
        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        )
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

        // Проверяем, что напечатанное значение попало в инпут
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

        // Нажимаем кнопку Отменить (без сохранения)
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        )

        // Должны вернуться прежние значения
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
    })

    test('Должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options)
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        )

        // Очищаем поле Фамилия
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

        // Нажимаем сохранить
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton'),
        )

        // Должна отобразиться ошибка (из-за того, что обязательное поле не заполнено)
        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument()
    })

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        // Мокаем вызова метода put у api
        const mockPutReq = jest.spyOn($api, 'put')

        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        )

        // Вводим новое значение
        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        )

        // Сохраняем
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton'),
        )

        expect(mockPutReq).toHaveBeenCalled()
    })
})
