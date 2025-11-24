'use client';

import { ReactNode } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:3101/graphql';

// Rails の GraphQL エンドポイント
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// 毎リクエストごとに NextAuth のセッションを見て JWT を Authorization に乗せる
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  // @ts-ignore
  const token = session?.accessToken as string | undefined;

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

type ApolloWrapperProps = {
  children: ReactNode;
};

export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
