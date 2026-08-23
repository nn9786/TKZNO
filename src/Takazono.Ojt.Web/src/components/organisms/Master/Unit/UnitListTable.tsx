// 単位一覧テーブル
import EditRoundedIcon from '@mui/icons-material/EditRounded'

import type { UnitDto } from '@/api/@types'
import {
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@/components/atoms/Mui'
import { OverflowText } from '@/components/molecules/Common/OverflowText'
import { SortableTableHeaderCell, type SortDirection } from '@/components/molecules/Common/SortableTableHeaderCell'
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
  nameRow: {
    alignItems: 'center',
  },
}

type Props = {
  items: UnitDto[]
  sortKey: string
  sortDirection: SortDirection
  onRowClick: (unit: UnitDto) => void
  onSort: (sortKey: string, direction: SortDirection) => void
}

export const UnitListTable = ({ items, sortKey, sortDirection, onRowClick, onSort }: Props) => {
  const { getLabel } = useLocalizationLabels()

  if (items.length === 0) {
    return <Typography sx={styles.emptyMessage}>{getLabel('T0018') /* データがありません。 */}</Typography>
  }

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={styles.editCell} />
            <SortableTableHeaderCell
              sortKey="displayOrderNumber"
              label={getLabel('T0012') /* 表示順 */}
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableTableHeaderCell
              sortKey="code"
              label={getLabel('T0032') /* 単位コード */}
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableTableHeaderCell
              sortKey="name"
              label={getLabel('T0033') /* 単位名称 */}
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
              <TableCell>{item.displayOrderNumber}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell sx={styles.nameCell}>
                <Stack direction="row" spacing={1} sx={styles.nameRow}>
                  <OverflowText text={item.name ?? ''} />
                  {item.unDeleteFlag && <Chip size="small" color="warning" label={getLabel('T0054') /* 削除不可 */} />}
                </Stack>
              </TableCell>
              <TableCell>{item.useFlag ? '✓' : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
