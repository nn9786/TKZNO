import { useMemo } from 'react'
import { z } from 'zod'

import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

const PASSWORD_MIN_LENGTH = 8

/** ログインID・表示名・権限・使用区分。作成/編集フォームで共通のプロフィール項目（計画書 §2.13 のスキーマ生成フックと同じ方針）。 */
export const useUserSchema = () => {
  const { getLabel } = useLocalizationLabels()

  return useMemo(
    () =>
      z.object({
        userName: z
          .string()
          .min(1, getLabel('V0001') /* 必須項目です。 */)
          .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */)
          .regex(/^[\x20-\x7E]*$/, getLabel('V0003') /* 半角英数記号で入力してください。 */),
        name: z
          .string()
          .min(1, getLabel('V0001') /* 必須項目です。 */)
          .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */),
        role: z.enum(['Admin', 'General']),
        useFlag: z.boolean(),
      }),
    [getLabel]
  )
}

export type UserFormValues = z.infer<ReturnType<typeof useUserSchema>>

/** パスワード/確認用パスワード（新規登録フォーム用に上記プロフィール項目と組み合わせて使う）。 */
export const useUserPasswordFieldsSchema = () => {
  const { getLabel } = useLocalizationLabels()

  return useMemo(
    () =>
      z
        .object({
          password: z
            .string()
            .min(
              PASSWORD_MIN_LENGTH,
              getLabel('V0004', { min: String(PASSWORD_MIN_LENGTH) }) /* {min}文字以上で入力してください。 */
            )
            .max(100, getLabel('V0002', { max: '100' }) /* {max}文字以内で入力してください。 */),
          confirmPassword: z.string().min(1, getLabel('V0001') /* 必須項目です。 */),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: getLabel('V0005') /* パスワードと確認用パスワードが一致しません。 */,
          path: ['confirmPassword'],
        }),
    [getLabel]
  )
}

/** 新規登録フォーム用: プロフィール項目 + パスワード。 */
export const useUserCreateSchema = () => {
  const { getLabel } = useLocalizationLabels()

  return useMemo(
    () =>
      z
        .object({
          userName: z
            .string()
            .min(1, getLabel('V0001') /* 必須項目です。 */)
            .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */)
            .regex(/^[\x20-\x7E]*$/, getLabel('V0003') /* 半角英数記号で入力してください。 */),
          name: z
            .string()
            .min(1, getLabel('V0001') /* 必須項目です。 */)
            .max(50, getLabel('V0002', { max: '50' }) /* {max}文字以内で入力してください。 */),
          role: z.enum(['Admin', 'General']),
          useFlag: z.boolean(),
          password: z
            .string()
            .min(
              PASSWORD_MIN_LENGTH,
              getLabel('V0004', { min: String(PASSWORD_MIN_LENGTH) }) /* {min}文字以上で入力してください。 */
            )
            .max(100, getLabel('V0002', { max: '100' }) /* {max}文字以内で入力してください。 */),
          confirmPassword: z.string().min(1, getLabel('V0001') /* 必須項目です。 */),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: getLabel('V0005') /* パスワードと確認用パスワードが一致しません。 */,
          path: ['confirmPassword'],
        }),
    [getLabel]
  )
}

export type UserCreateFormValues = z.infer<ReturnType<typeof useUserCreateSchema>>
export type UserPasswordFormValues = z.infer<ReturnType<typeof useUserPasswordFieldsSchema>>
