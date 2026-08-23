import { Draggable } from '@hello-pangea/dnd'
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded'
import type { ReactNode } from 'react'

import { Box } from '@/components/atoms/Mui'

type Props = {
  draggableId: string
  index: number
  children: ReactNode
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    p: 1.5,
    mb: 1,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
  },
  handle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    color: 'text.disabled',
  },
}

/** ドラッグ&ドロップで並び替え可能な1行（行全体がドラッグハンドル）。 */
export const DndTableRow = ({ draggableId, index, children }: Props) => (
  <Draggable draggableId={draggableId} index={index}>
    {(provided) => (
      <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={styles.row}>
        <Box sx={styles.handle}>
          <DragIndicatorRoundedIcon fontSize="small" />
        </Box>
        {children}
      </Box>
    )}
  </Draggable>
)
