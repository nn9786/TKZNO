// マスタメニュー画面
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import StraightenRoundedIcon from '@mui/icons-material/StraightenRounded'
import { useNavigate } from 'react-router-dom'

import { Box, Paper, Stack, Typography } from '@/components/atoms/Mui'
import { Base } from '@/components/templates'
import { ROUTE } from '@/constants/route'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useAppSelector } from '@/hooks/useStore'
import { appColors } from '@/styles/theme'

const styles = {
  heroCard: {
    mb: 2.5,
    p: { xs: 2.5, md: 3.5 },
    borderRadius: 4,
    border: `1px solid ${appColors.masterHeroBorder}`,
    background: appColors.masterHeroBackground,
    overflow: 'hidden',
    position: 'relative',
  },
  heroCircle: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: '50%',
    right: -80,
    top: -115,
    bgcolor: appColors.masterHeroCircleBg,
  },
  heroTitleRow: {
    alignItems: 'center',
    mb: 1,
    position: 'relative',
  },
  heroTitle: {
    fontWeight: 700,
    color: appColors.masterHeroTitle,
  },
  card: {
    p: 2.5,
    width: { xs: '100%', md: 290 },
    minHeight: 150,
    cursor: 'pointer',
    borderRadius: 3,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: appColors.masterCardShadow,
    },
  },
  cardTitleRow: {
    alignItems: 'center',
    color: appColors.masterCardTitle,
  },
  cardTitle: {
    fontWeight: 700,
  },
  cardCaption: {
    mt: 1.5,
    color: appColors.masterCardCaption,
  },
}

const menuCardDirection = { xs: 'column', md: 'row' } as const

const getCardStyle = (tone: string, border: string) => ({
  ...styles.card,
  border: `1px solid ${border}`,
  background: tone,
})

export const MasterMenu = () => {
  const { getLabel } = useLocalizationLabels()
  const navigate = useNavigate()
  const role = useAppSelector((state) => state.auth.role)

  const items = [
    // アカウント情報を扱うため、Adminのみカードを表示する（画面自体もProtectedRouteでAdmin限定）
    ...(role === 'Admin'
      ? [
          {
            label: getLabel('T0059') /* ユーザーマスタ */,
            route: ROUTE.MASTER_USER,
            icon: <GroupRoundedIcon fontSize="small" />,
            caption: 'User / Login / Role',
            tone: appColors.masterUserTone,
            border: appColors.masterUserBorder,
          },
        ]
      : []),
    {
      label: getLabel('T0002') /* 単位マスタ */,
      route: ROUTE.MASTER_UNIT,
      icon: <StraightenRoundedIcon fontSize="small" />,
      caption: 'Unit / Tax / Setting',
      tone: appColors.masterUnitTone,
      border: appColors.masterUnitBorder,
    },
    {
      label: getLabel('T0003') /* 店舗マスタ */,
      route: ROUTE.MASTER_STORE,
      icon: <StorefrontRoundedIcon fontSize="small" />,
      caption: 'Store / Department / Staff',
      tone: appColors.masterStoreTone,
      border: appColors.masterStoreBorder,
    },
    {
      label: getLabel('T0074') /* 取引先マスタ */,
      route: ROUTE.MASTER_SUPPLIER,
      icon: <LocalShippingRoundedIcon fontSize="small" />,
      caption: 'Supplier / Corporate / Credit',
      tone: appColors.masterSupplierTone,
      border: appColors.masterSupplierBorder,
    },
    {
      label: getLabel('T0083') /* 得意先マスタ */,
      route: ROUTE.MASTER_CUSTOMER,
      icon: <Diversity1RoundedIcon fontSize="small" />,
      caption: 'Customer / Rank / Contract',
      tone: appColors.masterCustomerTone,
      border: appColors.masterCustomerBorder,
    },
  ]

  return (
    <Base>
      <Paper sx={styles.heroCard}>
        <Box sx={styles.heroCircle} />
        <Stack direction="row" spacing={1} sx={styles.heroTitleRow}>
          <CategoryRoundedIcon fontSize="small" />
          <Typography variant="h5" sx={styles.heroTitle}>
            {getLabel('T0001') /* マスタメニュー */}
          </Typography>
        </Stack>
      </Paper>

      <Stack direction={menuCardDirection} spacing={2}>
        {items.map((item) => (
          <Paper key={item.route} sx={getCardStyle(item.tone, item.border)} onClick={() => navigate(item.route)}>
            <Stack direction="row" spacing={1} sx={styles.cardTitleRow}>
              {item.icon}
              <Typography variant="subtitle1" sx={styles.cardTitle}>
                {item.label}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={styles.cardCaption}>
              {item.caption}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Base>
  )
}
