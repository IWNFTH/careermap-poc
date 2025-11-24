import type { Meta, StoryObj } from '@storybook/react';
import { JobCard } from './JobCard';

const meta: Meta<typeof JobCard> = {
  title: 'Jobs/JobCard',
  component: JobCard,
};

export default meta;
type Story = StoryObj<typeof JobCard>;

export const Default: Story = {
  args: {
    job: {
      id: '1',
      title: 'フロントエンドエンジニア（Next.js / GraphQL）',
      company: 'Sample Inc.',
      location: '東京（リモート可）',
      url: 'https://example.com',
      description:
        'Next.js と GraphQL を用いたSaaSプロダクトのフロントエンド開発を担当していただきます。',
    },
  },
};
