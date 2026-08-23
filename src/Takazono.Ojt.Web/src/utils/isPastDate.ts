import { format } from 'date-fns'

/** ISO日付文字列(先頭10文字)が今日より前かどうかを判定する（得意先マスタの契約終了警告表示で使用）。 */
export const isPastDate = (value: string | null | undefined): boolean => {
  if (!value) return false
  const today = format(new Date(), 'yyyy-MM-dd')
  return value.slice(0, 10) < today
}
