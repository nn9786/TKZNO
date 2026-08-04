import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/components/atoms/Mui'

import { ConfirmDialog } from './ConfirmDialog'

const meta = {
  title: 'Molecules/Common/ConfirmDialog',
  component: ConfirmDialog,
  // Defaultはボタン操作で自前にopen/closeを管理するため、meta側のopen/onClose/onConfirmは型を満たすためのダミー値。
  args: {
    title: '削除確認',
    message: '削除してよろしいですか？',
    open: false,
    onClose: () => undefined,
    onConfirm: () => undefined,
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

/** 実際の呼び出し元（マスタ編集ドロワー等）と同じく、ボタン操作でopen/closeするstateを持たせて確認できるようにする。 */
export const Default: Story = {
  render: function ConfirmDialogDemo(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          削除
        </Button>
        <ConfirmDialog {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} />
      </>
    )
  },
}

export const Open: Story = {
  args: {
    open: true,
  },
}
