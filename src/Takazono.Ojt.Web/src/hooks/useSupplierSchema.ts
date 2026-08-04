import { useMemo } from 'react'
import { z } from 'zod'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

/**
 * getLabel 経由でメッセージを組み立てるスキーマ生成フック（計画書 §2.13）。
 * Store/Unitにはない「区分による条件付き必須」（`superRefine`）を導入している点が新規ポイント。
 */
export const useSupplierSchema = () => {
  const { getLabel } = useLocalizationLabels()

  return useMemo(
    () =>
      z
        .object({
          code: z
            .string()
            .min(1, getLabel('V0001') /* 必須項目です。 */)
            .max(16, getLabel('V0002', { max: '16' }) /* {max}文字以内で入力してください。 */)
            .regex(/^[\x20-\x7E]*$/, getLabel('V0003') /* 半角英数記号で入力してください。 */),
          name: z
            .string()
            .min(1, getLabel('V0001') /* 必須項目です。 */)
            .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */),
          supplierTypeKubun: z.enum(['Corporate', 'Individual']),
          corporateNumber: z
            .string()
            .max(13, getLabel('V0002', { max: '13' }) /* {max}文字以内で入力してください。 */)
            .optional()
            .or(z.literal('')),
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
          creditLimit: z
            .string()
            .optional()
            .or(z.literal(''))
            .refine((val) => !val || (!Number.isNaN(Number(val)) && Number(val) >= 0), {
              message: getLabel('V0010') /* 0以上で入力してください。 */,
            }),
          transactionStartDate: z.string().min(1, getLabel('V0001') /* 必須項目です。 */),
          useFlag: z.boolean(),
        })
        .superRefine((data, ctx) => {
          // 区分による条件付き必須: 法人の場合のみ法人番号が必須（Comment マスタの kubun 依存必須と同系統のパターン）。
          if (data.supplierTypeKubun === 'Corporate' && (!data.corporateNumber || data.corporateNumber.trim() === '')) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['corporateNumber'],
              message: getLabel('V0007') /* 法人の場合は必須です。 */,
            })
          }
        }),
    [getLabel]
  )
}

export type SupplierFormValues = z.infer<ReturnType<typeof useSupplierSchema>>
