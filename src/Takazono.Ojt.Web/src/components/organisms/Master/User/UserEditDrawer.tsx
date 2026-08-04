// ユーザー情報編集ドロワー
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import type { UserDto } from '@/api/@types'
import { Box, Button, Divider, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ConcurrencyConflictDialog } from '@/components/molecules/Common/ConcurrencyConflictDialog'
import { ConfirmDialog } from '@/components/molecules/Common/ConfirmDialog'
import { ReactHookFormSelect } from '@/components/molecules/ReactHookForm/ReactHookFormSelect'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { PasswordResetDialog } from '@/components/organisms/Master/User/PasswordResetDialog'
import { useApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useKengen } from '@/hooks/useKengen'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppSelector } from '@/hooks/useStore'
import { type UserFormValues, useUserSchema } from '@/hooks/useUserSchema'
import { deleteUser, updateUser } from '@/services/userApi'

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
}

type Props = {
  user: UserDto | null
  onClose: () => void
  onSaved: () => void
}

const formatDateTime = (value: string | undefined) => (value ? format(new Date(value), 'yyyy/MM/dd HH:mm') : '')

export const UserEditDrawer = ({ user, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { can } = useKengen()
  const currentSid = useAppSelector((state) => state.auth.sid)
  const { displayValidationError, concurrencyMessage, closeConcurrencyDialog } = useDisplayValidationError()
  const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useBoolean()
  const [isPasswordResetOpen, openPasswordReset, closePasswordReset] = useBoolean()
  const [isRoleChangeConfirmOpen, openRoleChangeConfirm, closeRoleChangeConfirm] = useBoolean()
  const pendingValuesRef = useRef<UserFormValues | null>(null)
  const schema = useUserSchema()

  const form = useForm<UserFormValues>({ resolver: zodResolver(schema) })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (user) {
      reset({
        userName: user.userName ?? '',
        name: user.name ?? '',
        role: (user.role as 'Admin' | 'General') ?? 'General',
        useFlag: user.useFlag ?? true,
      })
    }
  }, [user, reset])

  if (!user) return null

  const isSelf = currentSid !== null && user.sid === currentSid

  const performUpdate = async (values: UserFormValues) => {
    await api(() => updateUser(user.sid!, { ...values, version: user.version ?? '' }), {
      successMessage: getLabel('M0002') /* 更新しました。 */,
      onSuccess: onSaved,
      onError: (err) => displayValidationError(err, form, { onConcurrencyConflict: onSaved }),
    })
  }

  const onSubmit = handleSubmit(async (values) => {
    // 自分自身の権限を変更しようとしている場合は、気づかずに自分の操作可能範囲を変えてしまわないよう確認を挟む。
    if (isSelf && values.role !== user.role) {
      pendingValuesRef.current = values
      openRoleChangeConfirm()
      return
    }
    await performUpdate(values)
  })

  const handleConfirmRoleChange = async () => {
    closeRoleChangeConfirm()
    const values = pendingValuesRef.current
    pendingValuesRef.current = null
    if (values) {
      await performUpdate(values)
    }
  }

  const handleDelete = async () => {
    closeDeleteDialog()
    await api(() => deleteUser(user.sid!, user.version ?? ''), {
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
        transition: { onEntered: () => document.querySelector<HTMLInputElement>('input[name="userName"]')?.focus() },
      }}
    >
      <Box sx={styles.drawerBody}>
        <Stack direction="row" spacing={2} sx={styles.header}>
          <Typography variant="h6">{getLabel('B0006') /* 編集 */}</Typography>
          <Stack direction="row" spacing={1}>
            {!isSelf && can('delete') && (
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
            label={getLabel('T0060') /* ログインID */}
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message ?? getLabel('T0050') /* *必須 */}
          />
          <TextField
            label={getLabel('T0061') /* 表示名 */}
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
          <ReactHookFormSwitch
            control={control}
            name="useFlag"
            label={getLabel('T0011') /* 使用区分 */}
            disabled={isSelf}
          />
          {isSelf && (
            <Typography variant="caption" color="text.secondary">
              {getLabel('T0069') /* ログイン中の自分自身は使用中止・削除ができません。 */}
            </Typography>
          )}

          <Button variant="outlined" onClick={openPasswordReset}>
            {getLabel('T0068') /* パスワード再設定 */}
          </Button>

          <Divider sx={styles.auditBlock} />
          <Typography variant="caption" color="text.secondary">
            Sid: {user.sid}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0051') /* 登録日時 */}: {formatDateTime(user.createdDateTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getLabel('T0052') /* 更新日時 */}: {formatDateTime(user.modifiedDateTime)}（
            {getLabel('T0053') /* 更新者 */}: {user.modifiedName}）
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
      <PasswordResetDialog
        open={isPasswordResetOpen}
        sid={user.sid}
        onClose={closePasswordReset}
        onDone={closePasswordReset}
      />
      <ConfirmDialog
        open={isRoleChangeConfirmOpen}
        title={getLabel('T0070') /* 権限変更の確認 */}
        message={getLabel('T0071') /* 自分自身の権限を変更しようとしています。... */}
        onConfirm={() => void handleConfirmRoleChange()}
        onClose={closeRoleChangeConfirm}
        confirmLabel={getLabel('B0003') /* 保存 */}
        confirmColor="primary"
      />
    </Drawer>
  )
}
