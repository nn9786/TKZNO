import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'

import { ReactHookFormSelect } from './ReactHookFormSelect'

type FormValues = { role: string }

type DemoProps = { label: string; disabled?: boolean; error?: boolean; helperText?: string }

const OPTIONS = [
  { value: 'Admin', label: '管理者' },
  { value: 'General', label: '一般' },
]

/** react-hook-formの`control`が必須のため、Storybook上でも実際の呼び出し元と同じく`useForm`でラップして表示する。 */
const ReactHookFormSelectDemo = ({ label, disabled, error, helperText }: DemoProps) => {
  const { control } = useForm<FormValues>({ defaultValues: { role: 'General' } })
  return (
    <ReactHookFormSelect
      control={control}
      name="role"
      label={label}
      options={OPTIONS}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  )
}

const meta = {
  title: 'Molecules/ReactHookForm/ReactHookFormSelect',
  component: ReactHookFormSelectDemo,
  args: {
    label: '権限',
  },
} satisfies Meta<typeof ReactHookFormSelectDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/** サーバー側バリデーションエラーがフィールドにマッピングされた状態（`useDisplayValidationError`経由）。 */
export const WithError: Story = {
  args: {
    error: true,
    helperText: 'ロールが不正です。',
  },
}
