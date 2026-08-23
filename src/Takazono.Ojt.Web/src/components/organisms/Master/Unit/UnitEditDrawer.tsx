// 単位情報編集ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { UnitDto } from '@/api/@types'
import { Box, Button, Chip, Divider, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ConcurrencyConflictDialog } from '@/components/molecules/Common/ConcurrencyConflictDialog'
import { ConfirmDialog } from '@/components/molecules/Common/ConfirmDialog'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type UnitFormValues, useUnitSchema } from '@/hooks/useUnitSchema'
import { deleteUnit, updateUnit } from '@/services/unitApi'

const styles = {
  drawerPaper: {
    width: { xs: '100%', sm: 440 },
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
  titleRow: {
    alignItems: 'center',
  },
}

type Props = {
  unit: UnitDto | null
  onClose: () => void
  onSaved: () => void
}

const formatDateTime = (value: string | undefined) => (value ? format(new Date(value), 'yyyy/MM/dd HH:mm') : '')

export const UnitEditDrawer = ({ unit, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { displayValidationError, concurrencyMessage, closeConcurrencyDialog } = useDisplayValidationError()
  const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useBoolean()
  const schema = useUnitSchema()

  const form = useForm<UnitFormValues>({ resolver: zodResolver(schema) })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (unit) {
      reset({ code: unit.code ?? '', name: unit.name ?? '', useFlag: unit.useFlag ?? true })
    }
  }, [unit, reset])

  if (!unit) return null

  const isProtected = unit.unDeleteFlag ?? false

  const onSubmit = handleSubmit(async (values) => {
    await api(
      () =>
        updateUnit(unit.sid!, { ...values, useFlag: isProtected ? true : values.useFlag, version: unit.version ?? '' }),
      {
        successMessage: getLabel('M0002') /* 更新しました。 */,
        onSuccess: onSaved,
        onError: (err) => displayValidationError(err, form, { onConcurrencyConflict: onSaved }),
      }
    )
  })

  const handleDelete = async () => {
    closeDeleteDialog()
    await api(() => deleteUnit(unit.sid!, unit.version ?? ''), {
      successMessage: getLabel('M0003') /* 削除しました。 */,
      onSuccess: onSaved,
    })
  }

  return (
    <Drawer anchor="right" open onClose={onClose} slotProps={{ paper: { sx: styles.drawerPaper } }}>
      <Box sx={styles.drawerBody}>
        <Stack direction="row" spacing={2} sx={styles.header}>
          <Stack direction="row" spacing={1} sx={styles.titleRow}>
            <Typography variant="h6">{getLabel('B0006') /* 編集 */}</Typography>
            {isProtected && <Chip size="small" color="warning" label={getLabel('T0054') /* 削除不可 */} />}
          </Stack>
          <Stack direction="row" spacing={1}>
            {can('delete') && !isProtected && (
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
            label={getLabel('T0032') /* 単位コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0038') /* 00000000 */ }) /* 例）{value} */}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0033') /* 単位名称 */}
            placeholder={getLabel('T0034', { value: getLabel('T0039') /* 錠 */ }) /* 例）{value} */}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message ?? getLabel('T0050') /* *必須 */}
          />
          <ReactHookFormSwitch
            control={control}
            name="useFlag"
            label={getLabel('T0011') /* 使用区分 */}
            disabled={isProtected}
          />
          {isProtected && (
            <Typography variant="caption" color="text.secondary">
              {getLabel('T0056') /* このレコードは削除保護されているため、使用中止・削除ができません。 */}
            </Typography>
          )}

          <Divider sx={styles.auditBlock} />
          <Typography variant="caption" color="text.secondary">
            Sid: {unit.sid}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0051') /* 登録日時 */}: {formatDateTime(unit.createdDateTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0052') /* 更新日時 */}: {formatDateTime(unit.modifiedDateTime)}（
            {getLabel('T0053') /* 更新者 */}: {unit.modifiedName}）
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
