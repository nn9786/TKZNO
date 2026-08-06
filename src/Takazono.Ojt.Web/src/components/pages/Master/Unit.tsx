// 単位一覧画面
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { UnitDto } from '@/api/@types'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@/components/atoms/Mui'
import { Breadcrumbs } from '@/components/molecules/Common/Breadcrumbs'
import type { SortDirection } from '@/components/molecules/Common/SortableTableHeaderCell'
import {
  UnitCreateDrawer,
  UnitDisplayOrderDrawer,
  UnitEditDrawer,
  UnitListTable,
} from '@/components/organisms/Master/Unit'
import { Base } from '@/components/templates/Base'
import { ROUTE } from '@/constants/route'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useErrorDialog } from '@/hooks/useErrorDialog'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useSystemError } from '@/hooks/useSystemError'
import { getUnit, searchUnits } from '@/services/unitApi'
import { handleDrawerFocus } from '@/utils/handleDrawerFocus'

const styles = {
  title: {
    mb: 2,
  },
  toolbar: {
    mb: 2,
    alignItems: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
}

const DEFAULT_SORT_KEY = 'displayOrderNumber'

const LIST_PAGE_SIZE = 999

type SortOverrides = {
  sortKey?: string
  sortDirection?: SortDirection
}

export const Unit = () => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { showError } = useErrorDialog()
  const { displayParameterSystemError } = useSystemError()

  const [includeInactive, setIncludeInactive] = useState(false)
  const [items, setItems] = useState<UnitDto[]>([])
  const [sortKey, setSortKey] = useState(DEFAULT_SORT_KEY)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [createOpen, openCreate, closeCreate] = useBoolean()
  const [displayOrderOpen, openDisplayOrder, closeDisplayOrder] = useBoolean()
  const [editing, setEditing] = useState<UnitDto | null>(null)
  const focusTargetRef = useRef<HTMLButtonElement>(null)

  const search = useCallback(
    async (overrides?: SortOverrides) => {
      await api(
        () =>
          searchUnits({
            includeInactive,
            pageNumber: 1,
            pageSize: LIST_PAGE_SIZE,
            sortKey: overrides?.sortKey ?? sortKey,
            sortDirection: overrides?.sortDirection ?? sortDirection,
          }),
        {
          onSuccess: (res) => {
            setItems(res.items ?? [])
            setSortKey(res.sortKey ?? DEFAULT_SORT_KEY)
            setSortDirection(res.sortDirection === 'desc' ? 'desc' : 'asc')
          },
        }
      )
    },
    [api, includeInactive, sortKey, sortDirection]
  )

  useEffect(() => {
    void search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeInactive])

  const handleRowClick = async (item: UnitDto) => {
    if (item.sid === undefined) {
      displayParameterSystemError()
      return
    }
    await api(() => getUnit(item.sid!), {
      onSuccess: setEditing,
      onError: showError,
    })
  }

  const handleAfterMutation = () => {
    closeCreate()
    closeDisplayOrder()
    setEditing(null)
    void search()
  }

  const handleSort = (nextSortKey: string, nextSortDirection: SortDirection) => {
    void search({ sortKey: nextSortKey, sortDirection: nextSortDirection })
  }

  const drawerStates = useMemo(
    () => [createOpen, displayOrderOpen, editing !== null],
    [createOpen, displayOrderOpen, editing]
  )

  useEffect(() => {
    handleDrawerFocus(drawerStates, focusTargetRef)
  }, [drawerStates])

  return (
    <Base>
      <Breadcrumbs
        links={[
          { label: getLabel('T0001') /* マスタメニュー */, to: ROUTE.MASTER_MENU },
          { label: getLabel('T0002') /* 単位マスタ */ },
        ]}
      />
      <Typography variant="h5" sx={styles.title}>
        {getLabel('T0002') /* 単位マスタ */}
      </Typography>

      <Stack direction="row" spacing={2} sx={styles.toolbar}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeInactive}
              ref={focusTargetRef}
              onChange={(e) => setIncludeInactive(e.target.checked)}
            />
          }
          label={getLabel('T0017') /* 使用中止も表示 */}
        />
        <Box sx={styles.spacer} />
        {can('updateOrder') && (
          <Button type="button" variant="outlined" onClick={openDisplayOrder}>
            {getLabel('T0048') /* 表示順変更 */}
          </Button>
        )}
        {can('create') && (
          <Button type="button" variant="contained" onClick={openCreate}>
            {getLabel('B0002') /* 新規登録 */}
          </Button>
        )}
      </Stack>

      <UnitListTable
        items={items}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onRowClick={(item) => void handleRowClick(item)}
        onSort={handleSort}
      />

      <UnitCreateDrawer open={createOpen} onClose={closeCreate} onCreated={handleAfterMutation} />
      <UnitEditDrawer unit={editing} onClose={() => setEditing(null)} onSaved={handleAfterMutation} />
      <UnitDisplayOrderDrawer open={displayOrderOpen} onClose={closeDisplayOrder} onSaved={handleAfterMutation} />
    </Base>
  )
}
