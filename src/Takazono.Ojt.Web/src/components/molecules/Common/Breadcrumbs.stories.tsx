import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumbs } from './Breadcrumbs'

const meta = {
  title: 'Molecules/Common/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    links: [{ label: 'マスタメニュー', to: '/master' }, { label: '店舗マスタ' }],
  },
}

export const SingleLevel: Story = {
  args: {
    links: [{ label: 'ダッシュボード' }],
  },
}
