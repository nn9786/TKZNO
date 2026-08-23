import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import type { TextFieldProps } from '@mui/material'
import { memo } from 'react'

import { IconButton, InputAdornment, TextField } from '@/components/atoms/Mui'
import { useBoolean } from '@/hooks/useBoolean'

/** 表示/非表示切替アイコン付きのパスワード入力欄（ユーザーマスタの新規登録・パスワード再設定で共用）。 */
export const PasswordTextField = memo((props: TextFieldProps) => {
  const [visible, show, hide] = useBoolean()

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={visible ? hide : show} edge="end" tabIndex={-1}>
                {visible ? <VisibilityOffRoundedIcon fontSize="small" /> : <VisibilityRoundedIcon fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
})
PasswordTextField.displayName = 'PasswordTextField'
