import { useCallback, useEffect, useState } from 'react'

import type { StoreDto } from '@/api/@types'
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { Breadcrumbs } from '@/components/molecules/Common/Breadcrumbs'
import { StoreCreateDialog, StoreEditDialog, StoreListTable } from '@/components/organisms/Master/Store'
import { Base } from '@/components/templates/Base'
import { ROUTE } from '@/constants/route'
import { useApi } from '@/hooks/useApi'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { searchStores } from '@/services/storeApi'

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

export const Store = () => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()

  const [keyword, setKeyword] = useState('')
  const [includeInactive, setIncludeInactive] = useState(false)
  const [items, setItems] = useState<StoreDto[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [editing, setEditing] = useState<StoreDto | null>(null)

  const search = useCallback(async () => {
    await api(() => searchStores({ keyword, includeInactive, pageNumber: 1, pageSize: 100 }), {
      onSuccess: (res) => setItems(res.items ?? []),
    })
  }, [api, keyword, includeInactive])

  useEffect(() => {
    void search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAfterMutation = () => {
    setCreateOpen(false)
    setEditing(null)
    void search()
  }

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

      <Stack direction="row" spacing={2} sx={styles.toolbar}>
        <TextField
          size="small"
          label={getLabel('T0016') /* キーワード */}
          placeholder={getLabel('T0035') /* 検索キーワードを入力してください */}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={includeInactive} onChange={(e) => setIncludeInactive(e.target.checked)} />}
          label={getLabel('T0017') /* 使用中止も表示 */}
        />
        <Button variant="outlined" onClick={() => void search()}>
          {getLabel('B0001') /* 検索 */}
        </Button>
        <Box sx={styles.spacer} />
        <Button variant="contained" onClick={() => setCreateOpen(true)}>
          {getLabel('B0002') /* 新規登録 */}
        </Button>
      </Stack>

      <StoreListTable items={items} onRowClick={setEditing} />

      <StoreCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreated={handleAfterMutation} />
      <StoreEditDialog store={editing} onClose={() => setEditing(null)} onSaved={handleAfterMutation} />
    </Base>
  )
}
