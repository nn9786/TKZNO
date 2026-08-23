import { useCallback } from 'react'

import { useErrorDialog } from '@/hooks/useErrorDialog'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

/**
 * 行データのsid未指定など、通常操作では起こり得ないはずのパラメータ不整合を検知した際のガード用フック
 * （Takazono.Oliveの`useSystemError`相当）。バリデーションエラーではないため、汎用エラーダイアログで通知する。
 */
export const useSystemError = () => {
  const { showMessage } = useErrorDialog()
  const { getLabel } = useLocalizationLabels()

  const displayParameterSystemError = useCallback(() => {
    showMessage(getLabel('M0007') /* 画面の呼び出しに誤りがあります。 */)
  }, [showMessage, getLabel])

  return { displayParameterSystemError }
}
