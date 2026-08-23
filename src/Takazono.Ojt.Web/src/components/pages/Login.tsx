// ログイン画面
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Box, Button, Paper, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ROUTE } from '@/constants/route'
import { useApi } from '@/hooks/useApi'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppDispatch } from '@/hooks/useStore'
import { login } from '@/services/authApi'
import { loggedIn } from '@/store/slice/authSlice'
import { SESSION_EXPIRED_STORAGE_KEY } from '@/utils/apiClient'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'grey.100',
  },
  card: {
    p: 4,
    width: 360,
  },
  title: {
    mb: 3,
  },
}

type LoginFormValues = {
  userName: string
  password: string
}

export const Login = () => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_EXPIRED_STORAGE_KEY)) {
      sessionStorage.removeItem(SESSION_EXPIRED_STORAGE_KEY)
      enqueueSnackbar(getLabel('M0006') /* セッションの有効期限が切れました。再度ログインしてください。 */, {
        variant: 'info',
      })
    }
  }, [enqueueSnackbar, getLabel])

  const schema = useMemo(
    () =>
      z.object({
        userName: z.string().min(1, getLabel('V0001') /* 必須項目です。 */),
        password: z.string().min(1, getLabel('V0001') /* 必須項目です。 */),
      }),
    [getLabel]
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(schema) })

  const onSubmit = handleSubmit(async (values) => {
    await api(() => login(values), {
      onSuccess: (res) => {
        if (!res.token || !res.userName || !res.role) return
        dispatch(
          loggedIn({
            token: res.token,
            sid: res.sid ?? 0,
            userName: res.userName,
            name: res.name ?? res.userName,
            role: res.role as 'Admin' | 'General',
          })
        )
        navigate(ROUTE.DASHBOARD)
      },
      onError: (error) => {
        // 401(認証失敗)のときだけ「ユーザー名またはパスワードが正しくありません」を出す。
        // ネットワーク断や500などそれ以外の失敗まで同じ文言にすると原因が伝わらないため、その場合は実際のエラー内容をSnackbarで表示する。
        if (isAxiosError(error) && error.response?.status === 401) {
          setError('password', {
            type: 'custom',
            message: getLabel('T0019') /* ユーザー名またはパスワードが正しくありません。 */,
          })
        } else {
          enqueueSnackbar(extractErrorMessage(error, getLabel('M0005') /* 予期しないエラーが発生しました。 */), {
            variant: 'error',
          })
        }
      },
    })
  })

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.card} component="form" onSubmit={onSubmit}>
        <Typography variant="h5" sx={styles.title}>
          {getLabel('T0006') /* ログイン */}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label={getLabel('T0007') /* ユーザー名 */}
            placeholder={getLabel('T0036') /* ユーザー名を入力してください */}
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <TextField
            label={getLabel('T0008') /* パスワード */}
            placeholder={getLabel('T0037') /* パスワードを入力してください */}
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {getLabel('T0006') /* ログイン */}
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
