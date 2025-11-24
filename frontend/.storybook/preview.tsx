import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

import ApolloWrapper from '../src/app/apollo-provider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ApolloWrapper>
        <Story />
      </ApolloWrapper>
    ),
  ],
};

export default preview;
