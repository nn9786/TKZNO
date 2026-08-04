import { useCallback } from 'react'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppDispatch } from '@/hooks/useStore'
import { dialogOpened } from '@/store/slice/uiSlice'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

/**
 * APIエラーを、気づかれにくいSnackbarではなく明示的なダイアログで通知したい場面向けのフック（Takazono.Oliveの`useErrorDialog`相当）。
 * フォーム送信時のエラーは通常`useApi`の既定Snackbarか`useDisplayValidationError`で十分なので、
 * 一覧の行クリック時再取得のようにドロワーがまだ開いていない場面での利用を想定している。
 */
export const useErrorDialog = () => {
  const dispatch = useAppDispatch()
  const { getLabel } = useLocalizationLabels()

  const showMessage = useCallback(
    (message: string, title?: string) => {
      dispatch(dialogOpened({ title: title ?? getLabel('T0057') /* エラー */, message }))
    },
    [dispatch, getLabel]
  )

  const showError = useCallback(
    (error: unknown) => {
      showMessage(extractErrorMessage(error, getLabel('M0005') /* 予期しないエラーが発生しました。 */))
    },
    [showMessage, getLabel]
  )

  return { showError, showMessage }
}
