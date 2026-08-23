// 表示順変更用ドラッグ&ドロップテーブル(Head)
import type { ReactNode } from 'react'

import { Box } from '@/components/atoms/Mui'

type Props = {
  children: ReactNode
}

const styles = {
  head: {
    display: 'flex',
    alignItems: 'center',
    px: 1.5,
    py: 1,
    color: 'text.secondary',
    fontSize: 14,
  },
  handleSpacer: {
    width: 32,
  },
}

export const DndTableHead = ({ children }: Props) => (
  <Box sx={styles.head}>
    <Box sx={styles.handleSpacer} />
    {children}
  </Box>
)
