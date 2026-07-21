import { useMemo } from 'react'

import { z } from 'zod'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

/** getLabel 経由でメッセージを組み立てるスキーマ生成フック（計画書 §2.13）。言語切替のたびに再生成される。 */
export const useUnitSchema = () => {
  const { getLabel } = useLocalizationLabels()

  return useMemo(
    () =>
      z.object({
        code: z
          .string()
          .min(1, getLabel('V0001') /* 必須項目です。 */)
          .max(16, getLabel('V0002', { max: '16' }) /* {max}文字以内で入力してください。 */),
        name: z
          .string()
          .min(1, getLabel('V0001') /* 必須項目です。 */)
          .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */),
        useFlag: z.boolean(),
      }),
    [getLabel],
  )
}

export type UnitFormValues = z.infer<ReturnType<typeof useUnitSchema>>
