import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/components/atoms/Mui'

import { ConcurrencyConflictDialog } from './ConcurrencyConflictDialog'

const meta = {
  title: 'Molecules/Common/ConcurrencyConflictDialog',
  component: ConcurrencyConflictDialog,
  // Defaultはボタン操作で自前にopen/closeを管理するため、meta側のopen/onReloadは型を満たすためのダミー値。
  args: {
    message: '他のユーザーによって更新されています。画面を再読み込みしてください。',
    open: false,
    onReload: () => undefined,
  },
} satisfies Meta<typeof ConcurrencyConflictDialog>

export default meta
type Story = StoryObj<typeof meta>

/** 実際の呼び出し元（マスタ編集ドロワー）と同じく、409(CONCURRENCY_CONFLICT)受信を模したボタン操作で確認できるようにする。 */
export const Default: Story = {
  render: function ConcurrencyConflictDialogDemo(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          競合エラーを発生させる
        </Button>
        <ConcurrencyConflictDialog {...args} open={open} onReload={() => setOpen(false)} />
      </>
    )
  },
}

export const Open: Story = {
  args: {
    open: true,
  },
}
