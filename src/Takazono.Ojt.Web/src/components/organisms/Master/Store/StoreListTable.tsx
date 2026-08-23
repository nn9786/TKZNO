// 店舗一覧テーブル
import EditRoundedIcon from '@mui/icons-material/EditRounded'

import type { StoreDto } from '@/api/@types'
import {
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
    maxWidth: 240,
  },
  addressCell: {
    maxWidth: 280,
  },
}

type Props = {
  items: StoreDto[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  sortKey: string
  sortDirection: SortDirection
  onRowClick: (store: StoreDto) => void
  onSort: (sortKey: string, direction: SortDirection) => void
  onPaginationChange: (pageNumber: number, pageSize: number) => void
}

export const StoreListTable = ({
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
                sortKey="displayOrderNumber"
                label={getLabel('T0012') /* 表示順 */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeaderCell
                sortKey="code"
                label={getLabel('T0030') /* 店舗コード */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeaderCell
                sortKey="name"
                label={getLabel('T0031') /* 店舗名称 */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableCell>{getLabel('T0014') /* 住所 */}</TableCell>
              <TableCell>{getLabel('T0015') /* 電話番号 */}</TableCell>
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
                  <OverflowText text={item.name ?? ''} />
                </TableCell>
                <TableCell sx={styles.addressCell}>
                  <OverflowText text={item.address ?? ''} />
                </TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
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
