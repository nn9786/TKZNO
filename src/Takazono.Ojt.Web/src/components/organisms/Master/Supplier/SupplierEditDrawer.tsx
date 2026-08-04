// 取引先情報編集ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { SupplierDto } from '@/api/@types'
import { Box, Button, Divider, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ConcurrencyConflictDialog } from '@/components/molecules/Common/ConcurrencyConflictDialog'
import { ConfirmDialog } from '@/components/molecules/Common/ConfirmDialog'
import { ReactHookFormSelect } from '@/components/molecules/ReactHookForm/ReactHookFormSelect'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type SupplierFormValues, useSupplierSchema } from '@/hooks/useSupplierSchema'
import { deleteSupplier, updateSupplier } from '@/services/supplierApi'

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
  supplier: SupplierDto | null
  onClose: () => void
  onSaved: () => void
}

const formatDateTime = (value: string | undefined) => (value ? format(new Date(value), 'yyyy/MM/dd HH:mm') : '')
const formatDate = (value: string | undefined) => (value ? format(new Date(value), 'yyyy-MM-dd') : '')

export const SupplierEditDrawer = ({ supplier, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { displayValidationError, concurrencyMessage, closeConcurrencyDialog } = useDisplayValidationError()
  const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useBoolean()
  const schema = useSupplierSchema()

  const form = useForm<SupplierFormValues>({ resolver: zodResolver(schema) })
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (supplier) {
      reset({
        code: supplier.code ?? '',
        name: supplier.name ?? '',
        supplierTypeKubun: (supplier.supplierTypeKubun as 'Corporate' | 'Individual') ?? 'Individual',
        corporateNumber: supplier.corporateNumber ?? '',
        postalCode: supplier.postalCode ?? '',
        address: supplier.address ?? '',
        phoneNumber: supplier.phoneNumber ?? '',
        creditLimit: supplier.creditLimit != null ? String(supplier.creditLimit) : '',
        transactionStartDate: formatDate(supplier.transactionStartDate),
        useFlag: supplier.useFlag ?? true,
      })
    }
  }, [supplier, reset])

  const isCorporate = watch('supplierTypeKubun') === 'Corporate'

  if (!supplier) return null

  const onSubmit = handleSubmit(async (values) => {
    await api(
      () =>
        updateSupplier(supplier.sid!, {
          ...values,
          creditLimit: values.creditLimit ? Number(values.creditLimit) : undefined,
          version: supplier.version ?? '',
        }),
      {
        successMessage: getLabel('M0002') /* 更新しました。 */,
        onSuccess: onSaved,
        onError: (err) => displayValidationError(err, form, { onConcurrencyConflict: onSaved }),
      }
    )
  })

  const handleDelete = async () => {
    closeDeleteDialog()
    await api(() => deleteSupplier(supplier.sid!, supplier.version ?? ''), {
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
            label={getLabel('T0075') /* 取引先コード */}
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0076') /* 取引先名称 */}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message ?? getLabel('T0050') /* *必須 */}
          />
          <ReactHookFormSelect
            control={control}
            name="supplierTypeKubun"
            label={getLabel('T0077') /* 取引先区分 */}
            options={[
              { value: 'Corporate', label: getLabel('T0078') /* 法人 */ },
              { value: 'Individual', label: getLabel('T0079') /* 個人 */ },
            ]}
          />
          <TextField
            label={getLabel('T0080') /* 法人番号 */}
            {...register('corporateNumber')}
            error={!!errors.corporateNumber}
            helperText={errors.corporateNumber?.message ?? (isCorporate ? getLabel('T0050') /* *必須 */ : undefined)}
          />
          <TextField
            label={getLabel('T0013') /* 郵便番号 */}
            {...register('postalCode')}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
          <TextField
            label={getLabel('T0014') /* 住所 */}
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            label={getLabel('T0015') /* 電話番号 */}
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            type="number"
            label={getLabel('T0081') /* 与信限度額 */}
            {...register('creditLimit')}
            error={!!errors.creditLimit}
            helperText={errors.creditLimit?.message}
          />
          <TextField
            type="date"
            label={getLabel('T0082') /* 取引開始日 */}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('transactionStartDate')}
            error={!!errors.transactionStartDate}
            helperText={errors.transactionStartDate?.message ?? getLabel('T0050') /* *必須 */}
          />
          <ReactHookFormSwitch control={control} name="useFlag" label={getLabel('T0011') /* 使用区分 */} />

          <Divider sx={styles.auditBlock} />
          <Typography variant="caption" color="text.secondary">
            Sid: {supplier.sid}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0051') /* 登録日時 */}: {formatDateTime(supplier.createdDateTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0052') /* 更新日時 */}: {formatDateTime(supplier.modifiedDateTime)}（
            {getLabel('T0053') /* 更新者 */}: {supplier.modifiedName}）
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
