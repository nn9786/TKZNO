import type { UnitDto } from '@/api/@types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@/components/atoms/Mui'
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
}

type Props = {
  items: UnitDto[]
  onRowClick: (unit: UnitDto) => void
}

export const UnitListTable = ({ items, onRowClick }: Props) => {
  const { getLabel } = useLocalizationLabels()

  if (items.length === 0) {
    return <Typography sx={styles.emptyMessage}>{getLabel('T0018') /* データがありません。 */}</Typography>
  }

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{getLabel('T0012') /* 表示順 */}</TableCell>
            <TableCell>{getLabel('T0032') /* 単位コード */}</TableCell>
            <TableCell>{getLabel('T0033') /* 単位名称 */}</TableCell>
            <TableCell>{getLabel('T0011') /* 使用区分 */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.sid} hover sx={styles.row} onClick={() => onRowClick(item)}>
              <TableCell>{item.displayOrderNumber}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.useFlag ? '✓' : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
