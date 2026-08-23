// 共通レイアウトテンプレート
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded'
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import { type ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@/components/atoms/Mui'
import { GlobalDialog, Header } from '@/components/organisms/Common'
import { ROUTE } from '@/constants/route'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppSelector } from '@/hooks/useStore'
import { appColors } from '@/styles/theme'

type Props = {
  children: ReactNode
}

/** サイドメニューの開閉状態をlocalStorageに保存し、次回訪問時も引き継ぐ（Takazono.Oliveの`isMenuExtended`方式を踏襲）。 */
const SIDE_MENU_STORAGE_KEY = 'ojt:isSideMenuOpen'

/**
 * ローディング表示までの遅延時間。検索等の速い通信では見た目のオーバーレイ（背景を暗くする＋スピナー表示）を出さず、
 * 一定時間以上かかった通信だけ「読み込み中」と気づかせる（一瞬のちらつきを防ぐ）。
 * ただし操作のブロック自体はローディング開始と同時に効かせ、待機中の二重操作を防ぐ。
 */
const LOADING_VISUAL_DELAY_MS = 150

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
}

const getLoadingOverlayStyle = (visible: boolean) => ({
  ...styles.loadingOverlay,
  bgcolor: visible ? appColors.loadingOverlay : 'transparent',
})

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
  const isLoading = loadingCount > 0
  const [showLoadingVisual, setShowLoadingVisual] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(() => localStorage.getItem(SIDE_MENU_STORAGE_KEY) !== 'false')

  useEffect(() => {
    if (!isLoading) {
      setShowLoadingVisual(false)
      return
    }
    const timer = setTimeout(() => setShowLoadingVisual(true), LOADING_VISUAL_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isLoading])

  const handleToggleSideMenu = () => {
    setIsSideMenuOpen((prev) => {
      const next = !prev
      localStorage.setItem(SIDE_MENU_STORAGE_KEY, String(next))
      return next
    })
  }

  const navItems = [
    {
      label: getLabel('T0021') /* ダッシュボード */,
      path: ROUTE.DASHBOARD,
      icon: <DashboardRoundedIcon fontSize="small" />,
    },
    {
      label: getLabel('T0001') /* マスタメニュー */,
      path: ROUTE.MASTER_MENU,
      icon: <MenuBookRoundedIcon fontSize="small" />,
    },
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
            <Button sx={getToggleButtonStyle(isSideMenuOpen)} onClick={handleToggleSideMenu}>
              {isSideMenuOpen ? (
                <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />
              ) : (
                <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
              )}
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
      {isLoading && (
        <Box sx={getLoadingOverlayStyle(showLoadingVisual)}>{showLoadingVisual && <CircularProgress />}</Box>
      )}
      <GlobalDialog />
    </Box>
  )
}
