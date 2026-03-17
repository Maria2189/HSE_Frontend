import { fn } from '@storybook/test';
import Input from './Input';

export default {
  title: 'UI-Kit/Input',
  component: Input,
  args: {
    onChange: fn(),
  },
};

export const Default = {
  args: {
    placeholder: 'Введите текст...',
    type: 'text',
    value: '',
  },
};

export const Password = {
  args: {
    placeholder: 'Введите пароль...',
    type: 'password',
    value: '12345',
  },
};