// 得意先一覧画面
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { CustomerDto } from '@/api/@types'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@/components/atoms/Mui'
import { Breadcrumbs, type SortDirection } from '@/components/molecules/Common'
import {
  CustomerCreateDrawer,
  CustomerDisplayOrderDrawer,
  CustomerEditDrawer,
  CustomerListTable,
} from '@/components/organisms/Master/Customer'
import { Base } from '@/components/templates'
import { ROUTE } from '@/constants/route'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useErrorDialog } from '@/hooks/useErrorDialog'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useSystemError } from '@/hooks/useSystemError'
import { getCustomer, searchCustomers } from '@/services/customerApi'
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

export const Customer = () => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { showError } = useErrorDialog()
  const { displayParameterSystemError } = useSystemError()

  const [includeInactive, setIncludeInactive] = useState(false)
  const [items, setItems] = useState<CustomerDto[]>([])
  const [sortKey, setSortKey] = useState(DEFAULT_SORT_KEY)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [createOpen, openCreate, closeCreate] = useBoolean()
  const [displayOrderOpen, openDisplayOrder, closeDisplayOrder] = useBoolean()
  const [editing, setEditing] = useState<CustomerDto | null>(null)
  const focusTargetRef = useRef<HTMLButtonElement>(null)

  // 検索処理
  const search = useCallback(
    async (overrides?: SortOverrides) => {
      await api(
        () =>
          searchCustomers({
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

  const handleRowClick = async (item: CustomerDto) => {
    if (item.sid === undefined) {
      displayParameterSystemError()
      return
    }
    await api(() => getCustomer(item.sid!), {
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
          { label: getLabel('T0083') /* 得意先マスタ */ },
        ]}
      />
      <Typography variant="h5" sx={styles.title}>
        {getLabel('T0083') /* 得意先マスタ */}
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

      <CustomerListTable
        items={items}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onRowClick={(item) => void handleRowClick(item)}
        onSort={handleSort}
      />

      <CustomerCreateDrawer open={createOpen} onClose={closeCreate} onCreated={handleAfterMutation} />
      <CustomerEditDrawer customer={editing} onClose={() => setEditing(null)} onSaved={handleAfterMutation} />
      <CustomerDisplayOrderDrawer open={displayOrderOpen} onClose={closeDisplayOrder} onSaved={handleAfterMutation} />
    </Base>
  )
}
