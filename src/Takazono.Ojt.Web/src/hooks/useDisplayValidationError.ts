import { isAxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

type ValidationProblemDetails = {
  errors?: Record<string, string[]>
  errorCode?: string
}

type DisplayValidationErrorOptions = {
  /** 409(CONCURRENCY_CONFLICT)受信時に呼ばれる。通常は編集ドロワーを閉じて一覧を再取得する処理を渡す。 */
  onConcurrencyConflict?: () => void
}

/**
 * バックエンドの400（ASP.NET CoreのValidationProblemDetails）を、react-hook-formの該当フィールドに反映する。
 * Takazono.Oliveの`useDisplayValidationError`を、教材のフラットなDataAnnotationsバリデーション向けに簡略化したもの。
 * フィールドに対応しないエラー、または400以外のエラーは、useApiの既定と同じ汎用Snackbarにフォールバックする。
 * ただし409(楽観排他制御の競合、`errorCode: "CONCURRENCY_CONFLICT"`)だけは、
 * 気づかれにくいSnackbarではなく専用ダイアログ（`ConcurrencyConflictDialog`）で明示的に気づかせる。
 */
export const useDisplayValidationError = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { getLabel } = useLocalizationLabels()
  const [concurrencyMessage, setConcurrencyMessage] = useState<string | null>(null)
  const onConcurrencyResolvedRef = useRef<(() => void) | null>(null)

  const showFallback = (error: unknown) => {
    enqueueSnackbar(extractErrorMessage(error, getLabel('M0005') /* 予期しないエラーが発生しました。 */), {
      variant: 'error',
    })
  }

  const displayValidationError = <TFieldValues extends FieldValues>(
    error: unknown,
    form: UseFormReturn<TFieldValues>,
    options?: DisplayValidationErrorOptions
  ) => {
    const status = isAxiosError(error) ? error.response?.status : undefined
    const problem = isAxiosError(error) ? (error.response?.data as ValidationProblemDetails | undefined) : undefined

    if (status === 409 && problem?.errorCode === 'CONCURRENCY_CONFLICT') {
      onConcurrencyResolvedRef.current = options?.onConcurrencyConflict ?? null
      setConcurrencyMessage(extractErrorMessage(error, getLabel('M0005') /* 予期しないエラーが発生しました。 */))
      return
    }

    const validationErrors = status === 400 ? problem?.errors : undefined

    if (!validationErrors) {
      showFallback(error)
      return
    }

    const knownFields = Object.keys(form.getValues())
    let mappedAny = false

    Object.entries(validationErrors).forEach(([backendField, messages]) => {
      const fieldName = backendField.charAt(0).toLowerCase() + backendField.slice(1)
      if (knownFields.includes(fieldName)) {
        // バックエンドのエラーpayloadは実行時の文字列のため、静的にはPath<TFieldValues>であることを保証できない
        form.setError(fieldName as Path<TFieldValues>, { type: 'custom', message: messages[0] })
        mappedAny = true
      }
    })

    if (!mappedAny) {
      showFallback(error)
    }
  }

  const closeConcurrencyDialog = () => {
    setConcurrencyMessage(null)
    onConcurrencyResolvedRef.current?.()
    onConcurrencyResolvedRef.current = null
  }

  return { displayValidationError, concurrencyMessage, closeConcurrencyDialog }
}
