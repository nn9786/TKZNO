import { useMemo } from 'react'
import { z } from 'zod'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

/**
 * getLabel 経由でメッセージを組み立てるスキーマ生成フック（計画書 §2.13）。
 * Supplierと同じ「区分による条件付き必須」に加え、単一日付ではなく日付範囲（終了日≧開始日）の整合性チェックを持つ点が異なる。
 */
export const useCustomerSchema = () => {
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
          customerRankKubun: z.enum(['Standard', 'Premium', 'New']),
          preferentialDiscountRate: z
            .string()
            .optional()
            .or(z.literal(''))
            .refine((val) => !val || (!Number.isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
              message: getLabel('V0006', { min: '0', max: '100' }) /* {min}以上{max}以下で入力してください。 */,
            }),
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
          contractStartDate: z.string().min(1, getLabel('V0001') /* 必須項目です。 */),
          // 未入力は無期限契約を表すため任意。
          contractEndDate: z.string().optional().or(z.literal('')),
          useFlag: z.boolean(),
        })
        .superRefine((data, ctx) => {
          // 区分による条件付き必須: 優良の場合のみ優遇割引率が必須。
          if (
            data.customerRankKubun === 'Premium' &&
            (!data.preferentialDiscountRate || data.preferentialDiscountRate.trim() === '')
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['preferentialDiscountRate'],
              message: getLabel('V0008') /* 優良の場合は必須です。 */,
            })
          }
          // 日付範囲の整合性: 終了日を入力する場合は開始日以降であること(ISO文字列同士の比較でよい)。
          if (data.contractEndDate && data.contractStartDate && data.contractEndDate < data.contractStartDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['contractEndDate'],
              message: getLabel('V0009') /* 終了日は開始日以降にしてください。 */,
            })
          }
        }),
    [getLabel]
  )
}

export type CustomerFormValues = z.infer<ReturnType<typeof useCustomerSchema>>
