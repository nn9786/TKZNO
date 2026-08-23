// 取引先一覧テーブル
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { format } from 'date-fns'

import type { SupplierDto } from '@/api/@types'
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
}

type Props = {
  items: SupplierDto[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  sortKey: string
  sortDirection: SortDirection
  onRowClick: (supplier: SupplierDto) => void
  onSort: (sortKey: string, direction: SortDirection) => void
  onPaginationChange: (pageNumber: number, pageSize: number) => void
}

export const SupplierListTable = ({
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

  const kubunLabel = (value: string | null | undefined) =>
    value === 'Corporate' ? getLabel('T0078') /* 法人 */ : value === 'Individual' ? getLabel('T0079') /* 個人 */ : ''

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
                label={getLabel('T0075') /* 取引先コード */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeaderCell
                sortKey="name"
                label={getLabel('T0076') /* 取引先名称 */}
                activeSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableCell>{getLabel('T0077') /* 取引先区分 */}</TableCell>
              <TableCell>{getLabel('T0081') /* 与信限度額 */}</TableCell>
              <TableCell>{getLabel('T0082') /* 取引開始日 */}</TableCell>
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
                <TableCell>{kubunLabel(item.supplierTypeKubun)}</TableCell>
                <TableCell>{item.creditLimit != null ? item.creditLimit.toLocaleString() : ''}</TableCell>
                <TableCell>
                  {item.transactionStartDate ? format(new Date(item.transactionStartDate), 'yyyy/MM/dd') : ''}
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
