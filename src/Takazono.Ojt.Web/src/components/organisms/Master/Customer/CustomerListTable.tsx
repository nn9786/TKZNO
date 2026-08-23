// 得意先一覧テーブル
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { format } from 'date-fns'

import type { CustomerDto } from '@/api/@types'
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
import { isPastDate } from '@/utils/isPastDate'

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
  contractEndRow: {
    alignItems: 'center',
  },
}

type Props = {
  items: CustomerDto[]
  sortKey: string
  sortDirection: SortDirection
  onRowClick: (customer: CustomerDto) => void
  onSort: (sortKey: string, direction: SortDirection) => void
}

export const CustomerListTable = ({ items, sortKey, sortDirection, onRowClick, onSort }: Props) => {
  const { getLabel } = useLocalizationLabels()

  const kubunLabel = (value: string | null | undefined) =>
    value === 'Standard'
      ? getLabel('T0087') /* 一般 */
      : value === 'Premium'
        ? getLabel('T0088') /* 優良 */
        : value === 'New'
          ? getLabel('T0089') /* 新規 */
          : ''

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
              label={getLabel('T0084') /* 得意先コード */}
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableTableHeaderCell
              sortKey="name"
              label={getLabel('T0085') /* 得意先名称 */}
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <TableCell>{getLabel('T0086') /* 得意先区分 */}</TableCell>
            <TableCell>{getLabel('T0092') /* 契約終了日 */}</TableCell>
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
              <TableCell>{kubunLabel(item.customerRankKubun)}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} sx={styles.contractEndRow}>
                  <span>{item.contractEndDate ? format(new Date(item.contractEndDate), 'yyyy/MM/dd') : ''}</span>
                  {isPastDate(item.contractEndDate) && (
                    <Chip size="small" color="warning" label={getLabel('T0093') /* 契約終了 */} />
                  )}
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
