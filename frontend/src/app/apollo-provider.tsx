'use client';

import { ReactNode } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// ApolloProvider だけ React 向けのエントリから import
import { ApolloProvider } from '@apollo/client/react';

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:3101/graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

type ApolloWrapperProps = {
  children: ReactNode;
};

export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
