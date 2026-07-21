import { useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded'
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded'
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'

import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@/components/atoms/Mui'
import { Header } from '@/components/organisms/Common/Header'
import { ROUTE } from '@/constants/route'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppSelector } from '@/hooks/useStore'
import { appColors } from '@/styles/theme'

type Props = {
  children: ReactNode
}

const styles = {
  root: {
    minHeight: '100vh',
    bgcolor: appColors.appBackground,
    backgroundImage: appColors.appBackgroundEffect,
  },
  layout: {
    p: { xs: 2, md: 3 },
    display: 'flex',
    gap: { xs: 2, md: 3 },
    flexDirection: { xs: 'column', md: 'row' },
  },
  sideNav: {
    p: 1.5,
    borderRadius: 4,
    border: `1px solid ${appColors.sideNavBorder}`,
    bgcolor: appColors.white,
    alignSelf: 'flex-start',
    position: { xs: 'static', md: 'sticky' },
    top: { xs: 'auto', md: 16 },
  },
  menuHeader: {
    px: 1,
    py: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    color: appColors.sideNavHeaderText,
  },
  menuHeaderLeft: {
    alignItems: 'center',
  },
  menuTitle: {
    fontWeight: 700,
  },
  menuList: {
    mt: 0.5,
  },
  menuIcon: {
    display: 'inline-flex',
    mr: 1,
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
  },
  loadingOverlay: {
    position: 'fixed',
    inset: 0,
    bgcolor: appColors.loadingOverlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
}

const getNavButtonStyle = (active: boolean) => ({
  justifyContent: 'flex-start',
  px: 1.5,
  py: 1,
  borderRadius: 2.5,
  color: active ? appColors.navActiveText : appColors.navText,
  bgcolor: active ? appColors.navActiveBg : 'transparent',
  border: active ? `1px solid ${appColors.navActiveBorder}` : '1px solid transparent',
  fontWeight: active ? 700 : 500,
  '&:hover': {
    bgcolor: active ? appColors.navHoverActiveBg : appColors.navHoverBg,
    borderColor: active ? appColors.navActiveBorder : appColors.navHoverBorder,
  },
})

const getSideNavStyle = (open: boolean) => ({
  ...styles.sideNav,
  width: { xs: '100%', md: open ? 260 : 88 },
})

const getToggleButtonStyle = (open: boolean) => ({
  minWidth: 32,
  width: 32,
  height: 32,
  p: 0,
  borderRadius: 2,
  color: appColors.navText,
  border: `1px solid ${appColors.navHoverBorder}`,
  bgcolor: open ? appColors.white : appColors.navHoverBg,
})

const getNavButtonCollapsedStyle = (active: boolean, open: boolean) => {
  if (open) return getNavButtonStyle(active)
  return {
    ...getNavButtonStyle(active),
    justifyContent: 'center',
    px: 0,
  }
}

export const Base = ({ children }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getLabel } = useLocalizationLabels()
  const loadingCount = useAppSelector((state) => state.ui.loadingCount)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)

  const navItems = [
    { label: getLabel('T0021') /* ダッシュボード */, path: ROUTE.DASHBOARD, icon: <DashboardRoundedIcon fontSize="small" /> },
    { label: getLabel('T0001') /* マスタメニュー */, path: ROUTE.MASTER_MENU, icon: <MenuBookRoundedIcon fontSize="small" /> },
  ]

  const isActive = (path: string) => {
    if (path === ROUTE.DASHBOARD) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <Box sx={styles.root}>
      <Header />
      <Box sx={styles.layout}>
        <Paper component="nav" elevation={0} sx={getSideNavStyle(isSideMenuOpen)}>
          <Stack direction="row" spacing={1.2} sx={styles.menuHeader}>
            <Stack direction="row" spacing={1.2} sx={styles.menuHeaderLeft}>
              <HomeWorkRoundedIcon fontSize="small" />
              {isSideMenuOpen && (
                <Typography variant="subtitle2" sx={styles.menuTitle}>
                  {getLabel('T0022') /* メニュー */}
                </Typography>
              )}
            </Stack>
            <Button sx={getToggleButtonStyle(isSideMenuOpen)} onClick={() => setIsSideMenuOpen((prev) => !prev)}>
              {isSideMenuOpen ? <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" /> : <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />}
            </Button>
          </Stack>
          <Stack spacing={1} sx={styles.menuList}>
            {navItems.map((item) => {
              const active = isActive(item.path)
              return (
                <Button
                  key={item.path}
                  fullWidth
                  sx={getNavButtonCollapsedStyle(active, isSideMenuOpen)}
                  onClick={() => navigate(item.path)}
                >
                  <Box sx={styles.menuIcon}>{item.icon}</Box>
                  {isSideMenuOpen && item.label}
                </Button>
              )
            })}
          </Stack>
        </Paper>

        <Box sx={styles.content}>{children}</Box>
      </Box>
      {loadingCount > 0 && (
        <Box sx={styles.loadingOverlay}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
