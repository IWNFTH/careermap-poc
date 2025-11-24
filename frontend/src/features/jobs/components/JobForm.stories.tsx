import type { Meta, StoryObj } from '@storybook/react';
import { JobForm } from './JobForm';

const meta: Meta<typeof JobForm> = {
  title: 'Jobs/JobForm',
  component: JobForm,
};

export default meta;
type Story = StoryObj<typeof JobForm>;

export const Empty: Story = {
  args: {
    loading: false,
    onSubmit: async (values) => {
      // Storybook上ではログ出すだけ
      // eslint-disable-next-line no-console
      console.log('submit: ', values);
    },
  },
};

export const WithDefaultValues: Story = {
  args: {
    loading: false,
    message: 'バリデーションや見た目の確認用のサンプルです。',
    defaultValues: {
      title: 'Next.js × Rails バックエンドエンジニア',
      company: 'Sample Inc.',
      location: '東京（リモート可）',
      url: 'https://example.com/jobs/123',
      description: 'GraphQL / Apollo Client / React Hook Form を使う案件です。',
    },
    onSubmit: async (values: JobFormValues) => {
      // eslint-disable-next-line no-console
      console.log('submit: ', values);
    },
    submitLabel: '更新する',
  },
};
