// 店舗 表示順変更ドロワー
import type { DropResult } from '@hello-pangea/dnd'
import { useCallback, useEffect, useState } from 'react'

import type { StoreDto } from '@/api/@types'
import { Box, Button, Drawer, Stack, Typography } from '@/components/atoms/Mui'
import { DndTableBody, DndTableHead, DndTableRow } from '@/components/molecules/Common/DndTable'
import { useApi } from '@/hooks/useApi'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { searchStores, updateStoreDisplayOrder } from '@/services/storeApi'
import { reorder } from '@/utils/reorder'

const styles = {
  drawerPaper: {
    width: { xs: '100%', sm: 560 },
    maxWidth: '100vw',
  },
  drawerBody: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    px: 3,
    py: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    bgcolor: 'background.paper',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  description: {
    px: 3,
    pt: 2,
  },
  listArea: {
    px: 3,
    py: 2,
    overflowY: 'auto',
    flexGrow: 1,
  },
}

type Props = {
  open: boolean
  onClose: () => void
  onSaved: () => void
}

export const StoreDisplayOrderDrawer = ({ open, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const [items, setItems] = useState<StoreDto[]>([])

  const fetchAll = useCallback(async () => {
    await api(
      () =>
        searchStores({
          includeInactive: true,
          pageNumber: 1,
          pageSize: 1000,
          sortKey: 'displayOrderNumber',
          sortDirection: 'asc',
        }),
      { onSuccess: (res) => setItems(res.items ?? []) }
    )
  }, [api])

  useEffect(() => {
    if (open) void fetchAll()
  }, [open, fetchAll])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    setItems((prev) => reorder(prev, result.source.index, result.destination!.index))
  }

  const handleSave = async () => {
    await api(() => updateStoreDisplayOrder({ orderedSids: items.map((item) => item.sid!) }), {
      successMessage: getLabel('M0002') /* 更新しました。 */,
      onSuccess: onSaved,
    })
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: styles.drawerPaper } }}>
      <Box sx={styles.drawerBody}>
        <Stack direction="row" spacing={2} sx={styles.header}>
          <Typography variant="h6">{getLabel('T0048') /* 表示順変更 */}</Typography>
          <Stack direction="row" spacing={1}>
            <Button onClick={onClose}>{getLabel('B0004') /* キャンセル */}</Button>
            <Button variant="contained" onClick={handleSave} disabled={items.length === 0}>
              {getLabel('B0003') /* 保存 */}
            </Button>
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={styles.description}>
          {getLabel('T0049') /* ドラッグ&ドロップで並び替えできます。 */}
        </Typography>
        <Box sx={styles.listArea}>
          <DndTableHead>
            <Box sx={{ width: 56 }}>{getLabel('T0012') /* 表示順 */}</Box>
            <Box sx={{ width: 140 }}>{getLabel('T0030') /* 店舗コード */}</Box>
            <Box sx={{ flexGrow: 1 }}>{getLabel('T0031') /* 店舗名称 */}</Box>
          </DndTableHead>
          <DndTableBody droppableId="store-display-order" onDragEnd={handleDragEnd}>
            {items.map((item, index) => (
              <DndTableRow key={item.sid} draggableId={String(item.sid)} index={index}>
                <Box sx={{ width: 56 }}>{index + 1}</Box>
                <Box sx={{ width: 140 }}>{item.code}</Box>
                <Box sx={{ flexGrow: 1 }}>{item.name}</Box>
              </DndTableRow>
            ))}
          </DndTableBody>
        </Box>
      </Box>
    </Drawer>
  )
}
