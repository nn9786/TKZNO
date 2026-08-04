import { memo } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@/components/atoms/Mui'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'

type Props = {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onClose: () => void
  /** 確認ボタンのラベル・色。既定は削除確認（赤ボタン、「削除」ラベル）。 */
  confirmLabel?: string
  confirmColor?: 'error' | 'primary'
}

/** 削除確認など、汎用的な確認ダイアログ（`window.confirm`の代わり）。 */
export const ConfirmDialog = memo(
  ({ open, title, message, onConfirm, onClose, confirmLabel, confirmColor = 'error' }: Props) => {
    const { getLabel } = useLocalizationLabels()

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{getLabel('B0004') /* キャンセル */}</Button>
          <Button variant="contained" color={confirmColor} onClick={onConfirm}>
            {confirmLabel ?? getLabel('B0005') /* 削除 */}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)
ConfirmDialog.displayName = 'ConfirmDialog'
