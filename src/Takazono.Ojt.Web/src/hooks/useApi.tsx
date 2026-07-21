import { useCallback } from 'react'

import { useSnackbar } from 'notistack'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppDispatch } from '@/hooks/useStore'
import { loadingFinished, loadingStarted } from '@/store/slice/uiSlice'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

type ApiOptions<T> = {
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
  successMessage?: string
}

/** ローディング表示とエラーメッセージ表示を共通化する、Takazono.Olive の useApi に相当するフック。 */
export const useApi = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { getLabel } = useLocalizationLabels()

  const api = useCallback(
    async <T,>(fn: () => Promise<T>, options?: ApiOptions<T>): Promise<T | undefined> => {
      dispatch(loadingStarted())
      try {
        const result = await fn()
        options?.onSuccess?.(result)
        if (options?.successMessage) {
          enqueueSnackbar(options.successMessage, { variant: 'success' })
        }
        return result
      } catch (error) {
        if (options?.onError) {
          options.onError(error)
        } else {
          enqueueSnackbar(extractErrorMessage(error, getLabel('M0005') /* 予期しないエラーが発生しました。 */), { variant: 'error' })
        }
        return undefined
      } finally {
        dispatch(loadingFinished())
      }
    },
    [dispatch, enqueueSnackbar, getLabel],
  )

  return { api }
}
