import type { DropResult } from '@hello-pangea/dnd'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Box } from '@/components/atoms/Mui'
import { reorder } from '@/utils/reorder'

import { DndTableBody } from './DndTableBody'
import { DndTableHead } from './DndTableHead'
import { DndTableRow } from './DndTableRow'

type SampleItem = { sid: number; code: string; name: string }

const INITIAL_ITEMS: SampleItem[] = [
  { sid: 1, code: 'S001', name: 'サンプル店舗A' },
  { sid: 2, code: 'S002', name: 'サンプル店舗B' },
  { sid: 3, code: 'S003', name: 'テスト商店' },
]

/**
 * DndTableHead/DndTableBody/DndTableRowは3つ揃って初めて意味を持つ（Store/Unitの表示順変更ドロワー相当）ため、
 * まとめて1つのStoryとしてカタログ化する。
 */
const DndTableDemo = () => {
  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    setItems((prev) => reorder(prev, result.source.index, result.destination!.index))
  }

  return (
    <Box sx={{ width: 400 }}>
      <DndTableHead>
        <Box sx={{ width: 56 }}>表示順</Box>
        <Box sx={{ width: 100 }}>コード</Box>
        <Box sx={{ flexGrow: 1 }}>名称</Box>
      </DndTableHead>
      <DndTableBody droppableId="dnd-table-demo" onDragEnd={handleDragEnd}>
        {items.map((item, index) => (
          <DndTableRow key={item.sid} draggableId={String(item.sid)} index={index}>
            <Box sx={{ width: 56 }}>{index + 1}</Box>
            <Box sx={{ width: 100 }}>{item.code}</Box>
            <Box sx={{ flexGrow: 1 }}>{item.name}</Box>
          </DndTableRow>
        ))}
      </DndTableBody>
    </Box>
  )
}

const meta = {
  title: 'Molecules/Common/DndTable',
  component: DndTableDemo,
} satisfies Meta<typeof DndTableDemo>

export default meta
type Story = StoryObj<typeof meta>

/** ドラッグ&ドロップで行を並び替えできる（表示順変更ドロワーと同じ挙動）。 */
export const Default: Story = {}
