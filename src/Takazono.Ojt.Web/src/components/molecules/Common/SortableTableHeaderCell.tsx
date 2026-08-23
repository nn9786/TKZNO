// ソート可能な一覧テーブル見出しセル
import { memo } from 'react'

import { TableCell, TableSortLabel } from '@/components/atoms/Mui'

export type SortDirection = 'asc' | 'desc'

type Props = {
  sortKey: string
  label: string
  activeSortKey?: string
  sortDirection?: SortDirection
  onSort: (sortKey: string, direction: SortDirection) => void
  align?: 'left' | 'right' | 'center'
}

/** クリックで並び替えできる一覧テーブルの見出しセル（Takazono.OliveのTableCellWithSortに相当）。 */
export const SortableTableHeaderCell = memo(
  ({ sortKey, label, activeSortKey, sortDirection = 'asc', onSort, align }: Props) => {
    const isActive = activeSortKey === sortKey

    const handleClick = () => {
      const nextDirection: SortDirection = isActive && sortDirection === 'asc' ? 'desc' : 'asc'
      onSort(sortKey, nextDirection)
    }

    return (
      <TableCell align={align}>
        <TableSortLabel active={isActive} direction={isActive ? sortDirection : 'asc'} onClick={handleClick}>
          {label}
        </TableSortLabel>
      </TableCell>
    )
  }
)
SortableTableHeaderCell.displayName = 'SortableTableHeaderCell'
