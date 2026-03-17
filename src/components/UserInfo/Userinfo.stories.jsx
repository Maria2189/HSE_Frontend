import UserInfo from './UserInfo'

export default {
  title: 'UI-Kit/UserInfo',
  component: UserInfo,
}

export const Default = {
  args: {
    name: 'Антон Сергеенков',
    profession: 'Старший фронтенд-разработчик',
  },
}

export const Student = {
  args: {
    name: 'Мария',
    profession: 'Студент',
  },
}

export const Designer = {
  args: {
    name: 'Иван',
    profession: 'Дизайнер',
  },
}
