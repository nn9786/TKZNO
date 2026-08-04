import type { Meta, StoryObj } from '@storybook/react-vite'

import { PasswordTextField } from './PasswordTextField'

const meta = {
  title: 'Molecules/Common/PasswordTextField',
  component: PasswordTextField,
  args: {
    label: 'パスワード',
  },
} satisfies Meta<typeof PasswordTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: true,
    helperText: '8文字以上で入力してください。',
  },
}
