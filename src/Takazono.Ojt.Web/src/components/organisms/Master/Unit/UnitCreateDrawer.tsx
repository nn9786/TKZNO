// 単位情報新規登録ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Box, Button, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type UnitFormValues, useUnitSchema } from '@/hooks/useUnitSchema'
import { createUnit } from '@/services/unitApi'

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
}

type Props = {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export const UnitCreateDrawer = ({ open, onClose, onCreated }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { displayValidationError } = useDisplayValidationError()
  const schema = useUnitSchema()

  const form = useForm<UnitFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '', name: '', useFlag: true },
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    await api(() => createUnit(values), {
      successMessage: getLabel('M0001') /* 登録しました。 */,
      onSuccess: () => {
        reset()
        onCreated()
      },
      onError: (err) => displayValidationError(err, form),
    })
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
            label={getLabel('T0032') /* 単位コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0038') /* 00000000 */ }) /* 例）{value} */}
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
          <ReactHookFormSwitch control={control} name="useFlag" label={getLabel('T0011') /* 使用区分 */} />
        </Stack>
      </Box>
    </Drawer>
  )
}
