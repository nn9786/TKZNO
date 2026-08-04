// 店舗情報編集ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { StoreDto } from '@/api/@types'
import { Box, Button, Divider, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ConcurrencyConflictDialog } from '@/components/molecules/Common/ConcurrencyConflictDialog'
import { ConfirmDialog } from '@/components/molecules/Common/ConfirmDialog'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type StoreFormValues, useStoreSchema } from '@/hooks/useStoreSchema'
import { deleteStore, updateStore } from '@/services/storeApi'

const styles = {
  drawerPaper: {
    width: { xs: '100%', sm: 520 },
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
  formStack: {
    px: 3,
    py: 2,
    spacing: 2,
    overflowY: 'auto',
    flexGrow: 1,
  },
  auditBlock: {
    mt: 1,
  },
}

type Props = {
  store: StoreDto | null
  onClose: () => void
  onSaved: () => void
}

const formatDateTime = (value: string | undefined) => (value ? format(new Date(value), 'yyyy/MM/dd HH:mm') : '')

export const StoreEditDrawer = ({ store, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { displayValidationError, concurrencyMessage, closeConcurrencyDialog } = useDisplayValidationError()
  const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useBoolean()
  const schema = useStoreSchema()

  const form = useForm<StoreFormValues>({ resolver: zodResolver(schema) })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (store) {
      reset({
        code: store.code ?? '',
        name: store.name ?? '',
        postalCode: store.postalCode ?? '',
        address: store.address ?? '',
        phoneNumber: store.phoneNumber ?? '',
        useFlag: store.useFlag ?? true,
      })
    }
  }, [store, reset])

  if (!store) return null

  const onSubmit = handleSubmit(async (values) => {
    await api(() => updateStore(store.sid!, { ...values, version: store.version ?? '' }), {
      successMessage: getLabel('M0002') /* 更新しました。 */,
      onSuccess: onSaved,
      onError: (err) => displayValidationError(err, form, { onConcurrencyConflict: onSaved }),
    })
  })

  const handleDelete = async () => {
    closeDeleteDialog()
    await api(() => deleteStore(store.sid!, store.version ?? ''), {
      successMessage: getLabel('M0003') /* 削除しました。 */,
      onSuccess: onSaved,
    })
  }

  return (
    <Drawer
      anchor="right"
      open
      onClose={onClose}
      slotProps={{
        paper: { sx: styles.drawerPaper },
        transition: { onEntered: () => document.querySelector<HTMLInputElement>('input[name="code"]')?.focus() },
      }}
    >
      <Box sx={styles.drawerBody}>
        <Stack direction="row" spacing={2} sx={styles.header}>
          <Typography variant="h6">{getLabel('B0006') /* 編集 */}</Typography>
          <Stack direction="row" spacing={1}>
            {can('delete') && (
              <Button color="error" onClick={openDeleteDialog}>
                {getLabel('B0005') /* 削除 */}
              </Button>
            )}
            <Button onClick={onClose}>{getLabel('B0004') /* キャンセル */}</Button>
            {can('update') && (
              <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
                {getLabel('B0003') /* 保存 */}
              </Button>
            )}
          </Stack>
        </Stack>
        <Stack spacing={2} sx={styles.formStack}>
          <TextField
            label={getLabel('T0030') /* 店舗コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0040') /* 0001 */ }) /* 例）{value} */}
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0031') /* 店舗名称 */}
            placeholder={getLabel('T0034', { value: getLabel('T0041') /* 本店 */ }) /* 例）{value} */}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0013') /* 郵便番号 */}
            placeholder={getLabel('T0034', { value: getLabel('T0042') /* 1000001 */ }) /* 例）{value} */}
            {...register('postalCode')}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
          <TextField
            label={getLabel('T0014') /* 住所 */}
            placeholder={
              getLabel('T0034', { value: getLabel('T0043') /* 東京都千代田区丸の内1-1-1 */ }) /* 例）{value} */
            }
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            label={getLabel('T0015') /* 電話番号 */}
            placeholder={getLabel('T0034', { value: getLabel('T0044') /* 03-1234-5678 */ }) /* 例）{value} */}
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <ReactHookFormSwitch control={control} name="useFlag" label={getLabel('T0011') /* 使用区分 */} />

          <Divider sx={styles.auditBlock} />
          <Typography variant="caption" color="text.secondary">
            Sid: {store.sid}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0051') /* 登録日時 */}: {formatDateTime(store.createdDateTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0052') /* 更新日時 */}: {formatDateTime(store.modifiedDateTime)}（
            {getLabel('T0053') /* 更新者 */}: {store.modifiedName}）
          </Typography>
        </Stack>
      </Box>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={getLabel('T0047') /* 削除確認 */}
        message={getLabel('M0004') /* 削除してよろしいですか？ */}
        onConfirm={handleDelete}
        onClose={closeDeleteDialog}
      />
      <ConcurrencyConflictDialog
        open={concurrencyMessage !== null}
        message={concurrencyMessage ?? ''}
        onReload={closeConcurrencyDialog}
      />
    </Drawer>
  )
}
