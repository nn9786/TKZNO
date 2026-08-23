// 認証パスワード再設定ダイアログ
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { UserDto } from '@/api/@types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@/components/atoms/Mui'
import { ConcurrencyConflictDialog, PasswordTextField } from '@/components/molecules/Common'
import { useApi } from '@/hooks/useApi'
import { useDisplayValidationError } from '@/hooks/useDisplayValidationError'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { type UserPasswordFormValues, useUserPasswordFieldsSchema } from '@/hooks/useUserSchema'
import { updateUserPassword } from '@/services/userApi'

type Props = {
  open: boolean
  sid: number | undefined
  version: string | undefined
  onClose: () => void
  onDone: (updated: UserDto) => void
  onConcurrencyConflict: () => void
}

/** プロフィール編集とは別アクションのパスワード再設定専用ダイアログ（Takazono.Oliveの`PasswordResetDialog`相当）。 */
export const PasswordResetDialog = ({ open, sid, version, onClose, onDone, onConcurrencyConflict }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const { displayValidationError, concurrencyMessage, closeConcurrencyDialog } = useDisplayValidationError()
  const schema = useUserPasswordFieldsSchema()

  const form = useForm<UserPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (open) reset({ password: '', confirmPassword: '' })
  }, [open, reset])

  if (sid === undefined) return null

  // パスワード再設定処理
  const onSubmit = handleSubmit(async (values) => {
    await api(() => updateUserPassword(sid, { ...values, version: version ?? '' }), {
      successMessage: getLabel('M0008') /* パスワードを再設定しました。 */,
      onSuccess: onDone,
      onError: (err) => displayValidationError(err, form, { onConcurrencyConflict }),
    })
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{getLabel('T0068') /* パスワード再設定 */}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1, minWidth: 320 }}>
          <PasswordTextField
            label={getLabel('T0008') /* パスワード */}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{getLabel('B0004') /* キャンセル */}</Button>
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
          {getLabel('B0003') /* 保存 */}
        </Button>
      </DialogActions>
      <ConcurrencyConflictDialog
        open={concurrencyMessage !== null}
        message={concurrencyMessage ?? ''}
        onReload={closeConcurrencyDialog}
      />
    </Dialog>
  )
}
