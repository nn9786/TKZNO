// ページネーション
import { memo } from 'react'

import { Box, MenuItem, Pagination as MuiPagination, Select, Stack, Typography } from '@/components/atoms/Mui'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

type Props = {
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  onChange: (pageNumber: number, pageSize: number) => void
}

const styles = {
  root: {
    mt: 2,
    alignItems: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
}

/** 一覧テーブル共通のページネーション（表示件数の切替＋ページ送り）。 */
export const Pagination = memo(({ pageNumber, pageSize, totalCount, totalPages, onChange }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const from = totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1
  const to = Math.min(pageNumber * pageSize, totalCount)

  return (
    <Stack direction="row" spacing={2} sx={styles.root}>
      <Typography variant="body2" color="text.secondary">
        {getLabel('T0045' /* {from}-{to}件 / 全{total}件 */, {
          from: String(from),
          to: String(to),
          total: String(totalCount),
        })}
      </Typography>
      <Select
        size="small"
        value={pageSize}
        onChange={(e) => onChange(1, Number(e.target.value))}
        inputProps={{ 'aria-label': getLabel('T0073') /* 表示件数 */ }}
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <MenuItem key={size} value={size}>
            {getLabel('T0046' /* {size}件 */, { size: String(size) })}
          </MenuItem>
        ))}
      </Select>
      <Box sx={styles.spacer} />
      <MuiPagination
        page={pageNumber}
        count={Math.max(totalPages, 1)}
        onChange={(_event, page) => onChange(page, pageSize)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  )
})
Pagination.displayName = 'Pagination'
