import { useMemo } from 'react'
import { z } from 'zod'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

/** getLabel 経由でメッセージを組み立てるスキーマ生成フック（計画書 §2.13）。言語切替のたびに再生成される。 */
export const useStoreSchema = () => {
  const { getLabel } = useLocalizationLabels()

  return useMemo(
    () =>
      z.object({
        code: z
          .string()
          .min(1, getLabel('V0001') /* 必須項目です。 */)
          .max(16, getLabel('V0002', { max: '16' }) /* {max}文字以内で入力してください。 */)
          .regex(/^[\x20-\x7E]*$/, getLabel('V0003') /* 半角英数記号で入力してください。 */),
        name: z
          .string()
          .min(1, getLabel('V0001') /* 必須項目です。 */)
          .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */),
        postalCode: z
          .string()
          .max(8, getLabel('V0002', { max: '8' }) /* {max}文字以内で入力してください。 */)
          .optional()
          .or(z.literal('')),
        address: z
          .string()
          .max(200, getLabel('V0002', { max: '200' }) /* {max}文字以内で入力してください。 */)
          .optional()
          .or(z.literal('')),
        phoneNumber: z
          .string()
          .max(20, getLabel('V0002', { max: '20' }) /* {max}文字以内で入力してください。 */)
          .optional()
          .or(z.literal('')),
        useFlag: z.boolean(),
      }),
    [getLabel]
  )
}

export type StoreFormValues = z.infer<ReturnType<typeof useStoreSchema>>
