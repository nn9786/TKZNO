// 店舗情報新規登録ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Box, Button, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm'
import { useApi } from '@/hooks/useApi'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type StoreFormValues, useStoreSchema } from '@/hooks/useStoreSchema'
import { createStore } from '@/services/storeApi'

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

export const StoreCreateDrawer = ({ open, onClose, onCreated }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { displayValidationError } = useDisplayValidationError()
  const schema = useStoreSchema()

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', name: '', postalCode: '', address: '', phoneNumber: '', useFlag: true },
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  // 新規登録処理
  const onSubmit = handleSubmit(async (values) => {
    await api(() => createStore(values), {
      successMessage: getLabel('M0001') /* 登録しました。 */,
      onSuccess: () => {
        reset()
        onCreated()
      },
      onError: (err) => displayValidationError(err, form),
    })
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
            label={getLabel('T0030') /* 店舗コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0040') /* 0001 */ }) /* 例）{value} */}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
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
        </Stack>
      </Box>
    </Drawer>
  )
}
