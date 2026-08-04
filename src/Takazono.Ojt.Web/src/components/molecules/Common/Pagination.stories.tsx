import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Pagination } from './Pagination'

const meta = {
  title: 'Molecules/Common/Pagination',
  component: Pagination,
  // 各Storyは実際のページ操作を試せるようStory側でstateを持つため、meta側の`onChange`は型を満たすためのダミー実装。
  args: { onChange: () => undefined },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/** ページ番号・件数はコンポーネント外で管理する制御コンポーネントのため、Story側でstateを持って操作を確認できるようにする。 */
export const Default: Story = {
  args: {
    pageNumber: 1,
    pageSize: 20,
    totalCount: 123,
    totalPages: 7,
  },
  render: function PaginationDemo(args) {
    const [state, setState] = useState(args)
    return (
      <Pagination
        {...state}
        onChange={(pageNumber, pageSize) => setState((prev) => ({ ...prev, pageNumber, pageSize }))}
      />
    )
  },
}

export const Empty: Story = {
  args: {
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
  },
}
