import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded'

import { Box, Paper, Stack, Typography } from '@/components/atoms/Mui'
import { Base } from '@/components/templates/Base'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { appColors } from '@/styles/theme'

const styles = {
  heroCard: {
    mb: 3,
    p: { xs: 2.5, md: 4 },
    borderRadius: 4,
    color: appColors.dashboardCardText,
    background: appColors.dashboardCardBackground,
    border: `1px solid ${appColors.dashboardCardBorder}`,
    position: 'relative',
    overflow: 'hidden',
  },
  heroCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    right: -60,
    top: -100,
    bgcolor: appColors.dashboardHeroCircleBg,
  },
  heroTitleRow: {
    alignItems: 'center',
    mb: 1.5,
    position: 'relative',
  },
  strongText: {
    fontWeight: 700,
  },
}

export const Dashboard = () => {
  const { getLabel } = useLocalizationLabels()

  return (
    <Base>
      <Paper sx={styles.heroCard}>
        <Box sx={styles.heroCircle} />
        <Stack direction="row" spacing={1} sx={styles.heroTitleRow}>
          <DashboardCustomizeRoundedIcon fontSize="small" />
          <Typography variant="h6" sx={styles.strongText}>
            {getLabel('T0021') /* ダッシュボード */}
          </Typography>
        </Stack>
      </Paper>
    </Base>
  )
}
