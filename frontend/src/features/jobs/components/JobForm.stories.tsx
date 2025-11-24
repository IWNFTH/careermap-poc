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
