// 取引先情報新規登録ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Box, Button, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ReactHookFormSelect } from '@/components/molecules/ReactHookForm/ReactHookFormSelect'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type SupplierFormValues, useSupplierSchema } from '@/hooks/useSupplierSchema'
import { createSupplier } from '@/services/supplierApi'

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
}

type Props = {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export const SupplierCreateDrawer = ({ open, onClose, onCreated }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { displayValidationError } = useDisplayValidationError()
  const schema = useSupplierSchema()

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      name: '',
      supplierTypeKubun: 'Individual',
      corporateNumber: '',
      postalCode: '',
      address: '',
      phoneNumber: '',
      creditLimit: '',
      transactionStartDate: '',
      useFlag: true,
    },
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const isCorporate = watch('supplierTypeKubun') === 'Corporate'

  const onSubmit = handleSubmit(async (values) => {
    await api(
      () =>
        createSupplier({
          ...values,
          creditLimit: values.creditLimit ? Number(values.creditLimit) : undefined,
        }),
      {
        successMessage: getLabel('M0001') /* 登録しました。 */,
        onSuccess: () => {
          reset()
          onCreated()
        },
        onError: (err) => displayValidationError(err, form),
      }
    )
  })

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { sx: styles.drawerPaper },
        transition: { onEntered: () => document.querySelector<HTMLInputElement>('input[name="code"]')?.focus() },
      }}
    >
      <Box sx={styles.drawerBody}>
        <Stack direction="row" spacing={2} sx={styles.header}>
          <Typography variant="h6">{getLabel('B0002') /* 新規登録 */}</Typography>
          <Stack direction="row" spacing={1}>
            <Button onClick={onClose}>{getLabel('B0004') /* キャンセル */}</Button>
            <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
              {getLabel('B0003') /* 保存 */}
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={styles.formStack}>
          <TextField
            label={getLabel('T0075') /* 取引先コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0094') /* T001 */ }) /* 例）{value} */}
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0076') /* 取引先名称 */}
            placeholder={getLabel('T0034', { value: getLabel('T0095') /* 株式会社サンプル商事 */ }) /* 例）{value} */}
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
            placeholder={getLabel('T0034', { value: getLabel('T0096') /* 1234567890123 */ }) /* 例）{value} */}
            {...register('corporateNumber')}
            error={!!errors.corporateNumber}
            helperText={errors.corporateNumber?.message ?? (isCorporate ? getLabel('T0050') /* *必須 */ : undefined)}
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
        </Stack>
      </Box>
    </Drawer>
  )
}
