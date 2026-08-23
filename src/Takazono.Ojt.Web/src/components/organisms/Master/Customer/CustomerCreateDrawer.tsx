// 得意先情報新規登録ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Box, Button, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ReactHookFormSelect } from '@/components/molecules/ReactHookForm/ReactHookFormSelect'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { type CustomerFormValues, useCustomerSchema } from '@/hooks/useCustomerSchema'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { createCustomer } from '@/services/customerApi'

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

export const CustomerCreateDrawer = ({ open, onClose, onCreated }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { displayValidationError } = useDisplayValidationError()
  const schema = useCustomerSchema()

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      name: '',
      customerRankKubun: 'Standard',
      preferentialDiscountRate: '',
      postalCode: '',
      address: '',
      phoneNumber: '',
      contractStartDate: '',
      contractEndDate: '',
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

  const isPremium = watch('customerRankKubun') === 'Premium'

  const onSubmit = handleSubmit(async (values) => {
    await api(
      () =>
        createCustomer({
          ...values,
          preferentialDiscountRate: values.preferentialDiscountRate
            ? Number(values.preferentialDiscountRate)
            : undefined,
          contractEndDate: values.contractEndDate || undefined,
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
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: styles.drawerPaper } }}>
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
            label={getLabel('T0084') /* 得意先コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0097') /* C001 */ }) /* 例）{value} */}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0085') /* 得意先名称 */}
            placeholder={getLabel('T0034', { value: getLabel('T0098') /* サンプル商店 */ }) /* 例）{value} */}
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
        </Stack>
      </Box>
    </Drawer>
  )
}
