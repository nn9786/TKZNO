import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/atoms/Mui'

import { SortableTableHeaderCell, type SortDirection } from './SortableTableHeaderCell'

const meta = {
  title: 'Molecules/Common/SortableTableHeaderCell',
  component: SortableTableHeaderCell,
  // MUIのTableSortLabel/TableCellは<table>構造の中でのみ意味を持つため、実際の一覧テーブルと同じ形に包んで表示する。
  decorators: [
    (Story) => (
      <Table size="small">
        <Story />
      </Table>
    ),
  ],
  // Default Storyは自前でクリック操作を再現するためStory側でハンドラを持つ。meta側の`onSort`は型を満たすためのダミー実装。
  args: { onSort: () => undefined },
} satisfies Meta<typeof SortableTableHeaderCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sortKey: 'code',
    label: 'コード',
    activeSortKey: 'code',
    sortDirection: 'asc',
  },
  render: function SortableTableHeaderCellDemo(args) {
    const [sortKey, setSortKey] = useState(args.activeSortKey ?? args.sortKey)
    const [sortDirection, setSortDirection] = useState<SortDirection>(args.sortDirection ?? 'asc')
    return (
      <>
        <TableHead>
          <TableRow>
            <SortableTableHeaderCell
              {...args}
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={(nextSortKey, nextSortDirection) => {
                setSortKey(nextSortKey)
                setSortDirection(nextSortDirection)
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>サンプル行</TableCell>
          </TableRow>
        </TableBody>
      </>
    )
  },
}

export const Inactive: Story = {
  args: {
    sortKey: 'name',
    label: '名称',
    activeSortKey: 'code',
    sortDirection: 'asc',
  },
  decorators: [
    (Story) => (
      <TableHead>
        <TableRow>
          <Story />
        </TableRow>
      </TableHead>
    ),
  ],
}
