import { useCallback } from 'react'

import buttonLabelCsv from '@/constants/csv/ButtonLabel.csv?raw'
import messageLabelCsv from '@/constants/csv/MessageLabel.csv?raw'
import termLabelCsv from '@/constants/csv/TermLabel.csv?raw'
import validationLabelCsv from '@/constants/csv/ValidationLabel.csv?raw'
import { useAppSelector } from '@/hooks/useStore'

type LabelRow = { code: string; jp: string; en: string }

/**
 * Takazono.Physalis.Web の `useLocalizationLabels` 方式を踏襲した、コード管理CSVベースのi18nラベル取得フック。
 * Physalisでは `en` 列が空欄・言語引数がハードコードのままだったが、教材ではen翻訳とRedux連動の言語切替を完成させている（計画書 §2.9）。
 */
const parseCsv = (csv: string): LabelRow[] =>
  csv
    .trim()
    .split('\n')
    .slice(1) // header行を除く
    .map((line) => {
      const [code, jp, en] = line.split(',')
      return { code: code.trim(), jp: jp.trim(), en: en.trim() }
    })

const allLabels: LabelRow[] = [
  ...parseCsv(termLabelCsv),
  ...parseCsv(buttonLabelCsv),
  ...parseCsv(validationLabelCsv),
  ...parseCsv(messageLabelCsv),
]

export const useLocalizationLabels = () => {
  const language = useAppSelector((state) => state.setting.language)

  const getLabel = useCallback(
    (code: string, vars?: Record<string, string>) => {
      const row = allLabels.find((item) => item.code === code)
      const raw = row ? (language === 'en' ? row.en : row.jp) : code
      if (!vars) return raw
      return Object.entries(vars).reduce((msg, [key, value]) => msg.replaceAll(`{${key}}`, value), raw)
    },
    [language]
  )

  return { getLabel, language }
}
