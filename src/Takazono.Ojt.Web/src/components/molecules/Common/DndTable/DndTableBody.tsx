import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd'
import type { ReactNode } from 'react'

import { Box } from '@/components/atoms/Mui'

type Props = {
  droppableId: string
  onDragEnd: (result: DropResult) => void
  children: ReactNode
}

/** Takazono.Oliveの`DndTable`系molecules相当。`@hello-pangea/dnd`のDragDropContext/Droppableをラップする。 */
export const DndTableBody = ({ droppableId, onDragEnd, children }: Props) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Box {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </DragDropContext>
)
