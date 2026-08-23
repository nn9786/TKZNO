// 得意先情報編集ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { CustomerDto } from '@/api/@types'
import { Box, Button, Chip, Divider, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ConcurrencyConflictDialog, ConfirmDialog } from '@/components/molecules/Common'
import { ReactHookFormSelect, ReactHookFormSwitch } from '@/components/molecules/ReactHookForm'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { type CustomerFormValues, useCustomerSchema } from '@/hooks/useCustomerSchema'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { deleteCustomer, updateCustomer } from '@/services/customerApi'
import { isPastDate } from '@/utils/isPastDate'

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
  titleRow: {
    alignItems: 'center',
  },
}

type Props = {
  customer: CustomerDto | null
  onClose: () => void
  onSaved: () => void
}

const formatDateTime = (value: string | undefined) => (value ? format(new Date(value), 'yyyy/MM/dd HH:mm') : '')
const formatDate = (value: string | undefined | null) => (value ? format(new Date(value), 'yyyy-MM-dd') : '')

export const CustomerEditDrawer = ({ customer, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const { displayValidationError, concurrencyMessage, closeConcurrencyDialog } = useDisplayValidationError()
  const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useBoolean()
  const schema = useCustomerSchema()

  const form = useForm<CustomerFormValues>({ resolver: zodResolver(schema) })
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (customer) {
      reset({
        code: customer.code ?? '',
        name: customer.name ?? '',
        customerRankKubun: (customer.customerRankKubun as 'Standard' | 'Premium' | 'New') ?? 'Standard',
        preferentialDiscountRate:
          customer.preferentialDiscountRate != null ? String(customer.preferentialDiscountRate) : '',
        postalCode: customer.postalCode ?? '',
        address: customer.address ?? '',
        phoneNumber: customer.phoneNumber ?? '',
        contractStartDate: formatDate(customer.contractStartDate),
        contractEndDate: formatDate(customer.contractEndDate),
        useFlag: customer.useFlag ?? true,
      })
    }
  }, [customer, reset])

  const isPremium = watch('customerRankKubun') === 'Premium'

  if (!customer) return null

  const isExpired = isPastDate(customer.contractEndDate)

  // 編集処理
  const onSubmit = handleSubmit(async (values) => {
    await api(
      () =>
        updateCustomer(customer.sid!, {
          ...values,
          preferentialDiscountRate: values.preferentialDiscountRate
            ? Number(values.preferentialDiscountRate)
            : undefined,
          contractEndDate: values.contractEndDate || undefined,
          version: customer.version ?? '',
        }),
      {
        successMessage: getLabel('M0002') /* 更新しました。 */,
        onSuccess: onSaved,
        onError: (err) => displayValidationError(err, form, { onConcurrencyConflict: onSaved }),
      }
    )
  })

  // 削除処理
  const handleDelete = async () => {
    closeDeleteDialog()
    await api(() => deleteCustomer(customer.sid!, customer.version ?? ''), {
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
            {isExpired && <Chip size="small" color="warning" label={getLabel('T0093') /* 契約終了 */} />}
          </Stack>
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
            label={getLabel('T0084') /* 得意先コード */}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0085') /* 得意先名称 */}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message ?? getLabel('T0050') /* *必須 */}
          />
          <ReactHookFormSelect
            control={control}
            name="customerRankKubun"
            label={getLabel('T0086') /* 得意先区分 */}
            options={[
              { value: 'Standard', label: getLabel('T0087') /* 一般 */ },
              { value: 'Premium', label: getLabel('T0088') /* 優良 */ },
              { value: 'New', label: getLabel('T0089') /* 新規 */ },
            ]}
          />
          <TextField
            type="number"
            label={getLabel('T0090') /* 優遇割引率(%) */}
            {...register('preferentialDiscountRate')}
            error={!!errors.preferentialDiscountRate}
            helperText={
              errors.preferentialDiscountRate?.message ?? (isPremium ? getLabel('T0050') /* *必須 */ : undefined)
            }
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
            type="date"
            label={getLabel('T0091') /* 契約開始日 */}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('contractStartDate')}
            error={!!errors.contractStartDate}
            helperText={errors.contractStartDate?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            type="date"
            label={getLabel('T0092') /* 契約終了日 */}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('contractEndDate')}
            error={!!errors.contractEndDate}
            helperText={errors.contractEndDate?.message}
          />
          <ReactHookFormSwitch control={control} name="useFlag" label={getLabel('T0011') /* 使用区分 */} />

          <Divider sx={styles.auditBlock} />
          <Typography variant="caption" color="text.secondary">
            Sid: {customer.sid}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0051') /* 登録日時 */}: {formatDateTime(customer.createdDateTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0052') /* 更新日時 */}: {formatDateTime(customer.modifiedDateTime)}（
            {getLabel('T0053') /* 更新者 */}: {customer.modifiedName}）
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
