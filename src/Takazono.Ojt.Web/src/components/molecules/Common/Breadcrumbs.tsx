import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Stack, Typography } from '@/components/atoms/Mui'

type BreadcrumbLink = {
  label: string
  to?: string
}

type Props = {
  links: BreadcrumbLink[]
}

const styles = {
  root: {
    mb: 2,
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
}

export const Breadcrumbs = memo(({ links }: Props) => {
  const navigate = useNavigate()

  return (
    <Stack direction="row" spacing={1} sx={styles.root}>
      {links.map((link, index) => {
        const isLast = index === links.length - 1
        const isClickable = Boolean(link.to) && !isLast

        return (
          <Typography
            key={`${link.label}-${index}`}
            variant="body2"
            color={isLast ? 'text.primary' : 'text.secondary'}
            sx={isClickable ? styles.link : undefined}
            onClick={isClickable ? () => navigate(link.to!) : undefined}
          >
            {link.label}
            {index < links.length - 1 ? ' /' : ''}
          </Typography>
        )
      })}
    </Stack>
  )
})
Breadcrumbs.displayName = 'Breadcrumbs'
