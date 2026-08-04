import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@/components/atoms/Mui'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { dialogClosed } from '@/store/slice/uiSlice'

/**
 * 画面のどこからでも `useErrorDialog` 経由で開ける汎用エラーダイアログ（Takazono.Oliveの`GlobalDialog`相当）。
 * `Base`テンプレートに一度だけマウントする。フォームのフィールド単位エラーは対象外（`useDisplayValidationError`が担当）。
 */
export const GlobalDialog = () => {
  const dispatch = useAppDispatch()
  const { getLabel } = useLocalizationLabels()
  const dialog = useAppSelector((state) => state.ui.dialog)

  const handleClose = () => dispatch(dialogClosed())

  return (
    <Dialog open={dialog.isOpen} onClose={handleClose}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{dialog.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          {getLabel('B0007') /* 閉じる */}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
