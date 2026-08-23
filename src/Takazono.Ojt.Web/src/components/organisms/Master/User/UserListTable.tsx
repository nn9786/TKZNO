// ユーザーテーブル
import EditRoundedIcon from '@mui/icons-material/EditRounded'

import type { UserDto } from '@/api/@types'
import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@/components/atoms/Mui'
import { OverflowText, Pagination, SortableTableHeaderCell, type SortDirection } from '@/components/molecules/Common'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

const styles = {
  emptyMessage: {
    mt: 2,
  },
  tableContainer: {
    mt: 2,
  },
  row: {
    cursor: 'pointer',
  },
  editCell: {
    width: 40,
    px: 0.5,
  },
  nameCell: {
    maxWidth: 320,
  },
}

type Props = {
  items: UserDto[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  sortKey: string
  sortDirection: SortDirection
  onRowClick: (user: UserDto) => void
  onSort: (sortKey: string, direction: SortDirection) => void
  onPaginationChange: (pageNumber: number, pageSize: number) => void
}

export const UserListTable = ({
  items,
  pageNumber,
  pageSize,
  totalCount,
  totalPages,
  sortKey,
  sortDirection,
  onRowClick,
  onSort,
  onPaginationChange,
}: Props) => {
  const { getLabel } = useLocalizationLabels()

  if (items.length === 0) {
    return <Typography sx={styles.emptyMessage}>{getLabel('T0018') /* データがありません。 */}</Typography>
  }

  return (
    <>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.editCell} />
              <SortableTableHeaderCell
                sortKey="userName"
                label={getLabel('T0060') /* ログインID */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeaderCell
                sortKey="name"
                label={getLabel('T0061') /* 表示名 */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeaderCell
                sortKey="role"
                label={getLabel('T0062') /* 権限 */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeaderCell
                sortKey="useFlag"
                label={getLabel('T0011') /* 使用区分 */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.sid} hover sx={styles.row} onClick={() => onRowClick(item)}>
                <TableCell sx={styles.editCell}>
                  <IconButton
                    size="small"
                    aria-label={getLabel('B0006') /* 編集 */}
                    onClick={(e) => {
                      e.stopPropagation()
                      onRowClick(item)
                    }}
                  >
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>{item.userName}</TableCell>
                <TableCell sx={styles.nameCell}>
                  <OverflowText text={item.name ?? ''} />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={item.role === 'Admin' ? 'primary' : 'default'}
                    label={item.role === 'Admin' ? getLabel('T0063') /* 管理者 */ : getLabel('T0064') /* 一般 */}
                  />
                </TableCell>
                <TableCell>{item.useFlag ? '✓' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        onChange={onPaginationChange}
      />
    </>
  )
}
