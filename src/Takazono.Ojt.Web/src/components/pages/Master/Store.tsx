// 店舗一覧画面
import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { StoreDto } from '@/api/@types'
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { Breadcrumbs } from '@/components/molecules/Common/Breadcrumbs'
import type { SortDirection } from '@/components/molecules/Common/SortableTableHeaderCell'
import {
  StoreCreateDrawer,
  StoreDisplayOrderDrawer,
  StoreEditDrawer,
  StoreListTable,
} from '@/components/organisms/Master/Store'
import { Base } from '@/components/templates/Base'
import { ROUTE } from '@/constants/route'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useErrorDialog } from '@/hooks/useErrorDialog'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useSystemError } from '@/hooks/useSystemError'
import { downloadStoresCsv, getStore, searchStores } from '@/services/storeApi'
import { downloadFile } from '@/utils/downloadFile'
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

const DEFAULT_PAGE_SIZE = 20
const DEFAULT_SORT_KEY = 'displayOrderNumber'

type SearchOverrides = {
  pageNumber?: number
  pageSize?: number
  sortKey?: string
  sortDirection?: SortDirection
}

export const Store = () => {
  const { getLabel, language } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { showError } = useErrorDialog()
  const { displayParameterSystemError } = useSystemError()

  const [keyword, setKeyword] = useState('')
  const [code, setCode] = useState('')
  const [includeInactive, setIncludeInactive] = useState(false)
  const [items, setItems] = useState<StoreDto[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [sortKey, setSortKey] = useState(DEFAULT_SORT_KEY)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [createOpen, openCreate, closeCreate] = useBoolean()
  const [displayOrderOpen, openDisplayOrder, closeDisplayOrder] = useBoolean()
  const [editing, setEditing] = useState<StoreDto | null>(null)
  const focusTargetRef = useRef<HTMLButtonElement>(null)

  const search = useCallback(
    async (overrides?: SearchOverrides) => {
      await api(
        () =>
          searchStores({
            keyword,
            code,
            includeInactive,
            pageNumber: overrides?.pageNumber ?? pageNumber,
            pageSize: overrides?.pageSize ?? pageSize,
            sortKey: overrides?.sortKey ?? sortKey,
            sortDirection: overrides?.sortDirection ?? sortDirection,
          }),
        {
          onSuccess: (res) => {
            setItems(res.items ?? [])
            setPageNumber(res.pageNumber ?? 1)
            setPageSize(res.pageSize ?? DEFAULT_PAGE_SIZE)
            setTotalCount(res.totalCount ?? 0)
            setTotalPages(res.totalPages ?? 0)
            setSortKey(res.sortKey ?? DEFAULT_SORT_KEY)
            setSortDirection(res.sortDirection === 'desc' ? 'desc' : 'asc')
          },
        }
      )
    },
    [api, keyword, code, includeInactive, pageNumber, pageSize, sortKey, sortDirection]
  )

  useEffect(() => {
    void search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRowClick = async (item: StoreDto) => {
    if (item.sid === undefined) {
      displayParameterSystemError()
      return
    }
    await api(() => getStore(item.sid!), {
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
    void search({ pageNumber: 1, sortKey: nextSortKey, sortDirection: nextSortDirection })
  }

  const handlePaginationChange = (nextPageNumber: number, nextPageSize: number) => {
    void search({ pageNumber: nextPageNumber, pageSize: nextPageSize })
  }

  const handleDownloadCsv = async () => {
    await api(() => downloadStoresCsv(language), {
      onSuccess: (blob) => downloadFile(blob, 'store.csv'),
    })
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    void search({ pageNumber: 1 })
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
          { label: getLabel('T0003') /* 店舗マスタ */ },
        ]}
      />
      <Typography variant="h5" sx={styles.title}>
        {getLabel('T0003') /* 店舗マスタ */}
      </Typography>

      <Box component="form" onSubmit={handleSearchSubmit}>
        <Stack direction="row" spacing={2} sx={styles.toolbar}>
          <TextField
            size="small"
            label={getLabel('T0031') /* 店舗名称 */}
            placeholder={getLabel('T0035') /* 検索キーワードを入力してください */}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <TextField
            size="small"
            label={getLabel('T0030') /* 店舗コード */}
            placeholder={getLabel('T0058') /* 完全一致 */}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={includeInactive} onChange={(e) => setIncludeInactive(e.target.checked)} />}
            label={getLabel('T0017') /* 使用中止も表示 */}
          />
          <Button type="submit" variant="outlined">
            {getLabel('B0001') /* 検索 */}
          </Button>
          <Box sx={styles.spacer} />
          <Button type="button" variant="outlined" ref={focusTargetRef} onClick={() => void handleDownloadCsv()}>
            {getLabel('B0008') /* CSV出力 */}
          </Button>
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
      </Box>

      <StoreListTable
        items={items}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onRowClick={(item) => void handleRowClick(item)}
        onSort={handleSort}
        onPaginationChange={handlePaginationChange}
      />

      <StoreCreateDrawer open={createOpen} onClose={closeCreate} onCreated={handleAfterMutation} />
      <StoreEditDrawer store={editing} onClose={() => setEditing(null)} onSaved={handleAfterMutation} />
      <StoreDisplayOrderDrawer open={displayOrderOpen} onClose={closeDisplayOrder} onSaved={handleAfterMutation} />
    </Base>
  )
}
