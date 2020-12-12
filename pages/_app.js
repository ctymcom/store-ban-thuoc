import "tailwindcss/tailwind.css";
import "../next/styles/checkbox.css";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../next/lib/graphql/apolloClient";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}