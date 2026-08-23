import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'

import { ReactHookFormSwitch } from './ReactHookFormSwitch'

type FormValues = { useFlag: boolean }

type DemoProps = { label: string; disabled?: boolean }

/** react-hook-formの`control`が必須のため、Storybook上でも実際の呼び出し元と同じく`useForm`でラップして表示する。 */
const ReactHookFormSwitchDemo = ({ label, disabled }: DemoProps) => {
  const { control } = useForm<FormValues>({ defaultValues: { useFlag: true } })
  return <ReactHookFormSwitch control={control} name="useFlag" label={label} disabled={disabled} />
}

const meta = {
  title: 'Molecules/ReactHookForm/ReactHookFormSwitch',
  component: ReactHookFormSwitchDemo,
  args: {
    label: '使用区分',
  },
} satisfies Meta<typeof ReactHookFormSwitchDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
