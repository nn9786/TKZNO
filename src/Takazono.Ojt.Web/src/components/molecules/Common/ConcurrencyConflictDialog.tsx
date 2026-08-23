// 排他制御(競合)ダイアログ
import { memo } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@/components/atoms/Mui'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

type Props = {
  open: boolean
  message: string
  onReload: () => void
}

/**
 * 楽観排他制御（Version）の競合エラー専用ダイアログ。
 * 通常のバリデーションエラーとは異なり「他のユーザーが先に更新した」ことを明確に気づかせ、
 * 再読み込み（一覧再取得・編集ドロワーを閉じる）を強制する。バックドラップクリック等での
 * 意図しないクローズを避けるため、`onClose`は渡さず「再読み込み」ボタンのみで閉じる。
 */
export const ConcurrencyConflictDialog = memo(({ open, message, onReload }: Props) => {
  const { getLabel } = useLocalizationLabels()

  return (
    <Dialog open={open}>
      <DialogTitle>{getLabel('T0055') /* 更新の競合 */}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onReload}>
          {getLabel('B0009') /* 再読み込み */}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
ConcurrencyConflictDialog.displayName = 'ConcurrencyConflictDialog'
