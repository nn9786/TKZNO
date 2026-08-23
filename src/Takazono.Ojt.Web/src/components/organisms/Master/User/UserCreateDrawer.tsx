// ユーザー情報新規登録ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Box, Button, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { PasswordTextField } from '@/components/molecules/Common/PasswordTextField'
import { ReactHookFormSelect } from '@/components/molecules/ReactHookForm/ReactHookFormSelect'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type UserCreateFormValues, useUserCreateSchema } from '@/hooks/useUserSchema'
import { createUser } from '@/services/userApi'

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

export const UserCreateDrawer = ({ open, onClose, onCreated }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { displayValidationError } = useDisplayValidationError()
  const schema = useUserCreateSchema()

  const form = useForm<UserCreateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { userName: '', name: '', role: 'General', useFlag: true, password: '', confirmPassword: '' },
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    await api(() => createUser(values), {
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
            label={getLabel('T0060') /* ログインID */}
            placeholder={getLabel('T0034', { value: getLabel('T0066') /* taro01 */ }) /* 例）{value} */}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0061') /* 表示名 */}
            placeholder={getLabel('T0034', { value: getLabel('T0067') /* 山田太郎 */ }) /* 例）{value} */}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message ?? getLabel('T0050') /* *必須 */}
          />
          <ReactHookFormSelect
            control={control}
            name="role"
            label={getLabel('T0062') /* 権限 */}
            options={[
              { value: 'Admin', label: getLabel('T0063') /* 管理者 */ },
              { value: 'General', label: getLabel('T0064') /* 一般 */ },
            ]}
            error={!!errors.role}
            helperText={errors.role?.message}
          />
          <PasswordTextField
            label={getLabel('T0008') /* パスワード */}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message ?? getLabel('T0050') /* *必須 */}
          />
          <PasswordTextField
            label={getLabel('T0065') /* 確認用パスワード */}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message ?? getLabel('T0050') /* *必須 */}
          />
          <ReactHookFormSwitch control={control} name="useFlag" label={getLabel('T0011') /* 使用区分 */} />
        </Stack>
      </Box>
    </Drawer>
  )
}
