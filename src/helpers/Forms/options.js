import { emailRegExp } from './regex'

const required = 'Обязательное поле!'

export const Email = {
  required,
  minLength: {
    value: 6,
    message: 'Минимум 6 символов',
  },
  pattern: {
    value: emailRegExp,
    message: 'Некорректная почта',
  },
}

export const Password = {
  required,
  minLength: {
    value: 6,
    message: 'Минимум 6 символов',
  },
}

export const simpleField = {
  required,
  minLength: {
    value: 3,
    message: 'Минимум 3 символа',
  },
}
