import { useNavigate } from 'react-router-dom'

import { AppBar, Box, Button, MenuItem, Select, Toolbar, Typography } from '@/components/atoms/Mui'
import { ROUTE } from '@/constants/route'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { loggedOut } from '@/store/slice/authSlice'
import { type Language, languageChanged } from '@/store/slice/settingSlice'
import { appColors } from '@/styles/theme'

const styles = {
  appBar: {
    bgcolor: appColors.headerBarBg,
    color: appColors.headerText,
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid ${appColors.headerBorder}`,
  },
  toolbar: {
    gap: 2,
    minHeight: 64,
  },
  titleArea: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  titleButton: {
    color: 'inherit',
    textTransform: 'none',
    px: 0,
    py: 0,
    justifyContent: 'flex-start',
    minWidth: 0,
  },
  userChip: {
    px: 1.5,
    py: 0.6,
    borderRadius: 99,
    bgcolor: appColors.userChipBg,
    color: appColors.userChipText,
  },
  languageSelect: {
    minWidth: 110,
    bgcolor: appColors.white,
  },
  logoutButton: {
    borderRadius: 99,
  },
}

export const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getLabel, language } = useLocalizationLabels()
  const displayName = useAppSelector((state) => state.auth.name ?? state.auth.userName)

  const handleLogout = () => {
    dispatch(loggedOut())
    navigate(ROUTE.LOGIN)
  }

  const handleClickTitle = () => {
    navigate(ROUTE.DASHBOARD)
  }

  return (
    <AppBar position="sticky" elevation={0} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.titleArea}>
          <Button color="inherit" sx={styles.titleButton} onClick={handleClickTitle}>
            <Typography variant="h6" sx={styles.title}>
              {getLabel('T0020') /* TakazonoOJT 学習教材 */}
            </Typography>
          </Button>
        </Box>
        {displayName && (
          <Typography variant="body2" sx={styles.userChip}>
            {displayName}
          </Typography>
        )}
        <Select
          size="small"
          value={language}
          onChange={(e) => dispatch(languageChanged(e.target.value as Language))}
          sx={styles.languageSelect}
          inputProps={{ 'aria-label': getLabel('T0072') /* 表示言語 */ }}
        >
          <MenuItem value="ja">日本語</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
        <Box>
          <Button color="inherit" onClick={handleLogout} sx={styles.logoutButton}>
            {getLabel('T0004') /* ログアウト */}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
