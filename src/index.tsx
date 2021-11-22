/* eslint-disable no-loop-func */
import { DefaultOptions } from "@apollo/client";
import {
  ApolloClient, ApolloProvider, createHttpLink, from, fromPromise, gql, InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React from "react";
import ReactDOM from "react-dom";
import authService from "services/auth.service";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

let isRefreshing = false;
let pendingRequests: any = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback: () => any) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log("err -->", err);
        switch (err.message) {
          case "Signature has expired":
            let forward$;
            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                authService
                  .requestRefreshToken()
                  .then((accessToken: any) => {
                    // Store the new tokens for your auth link
                    console.log(
                      "accessToken -->",
                      accessToken.data.refreshToken.token
                    );
                    const newToken = accessToken.data.refreshToken.token;
                    const newrefreshToken =
                      accessToken.data.refreshToken.refreshToken;
                    authService.setStorageLoginToken(newToken);
                    authService.setStorageLoginRefreshToken(newrefreshToken)
                    resolvePendingRequests();
                    return accessToken.data.refreshToken.token;
                  })
                  .catch((error) => {
                    pendingRequests = [];
                    authService.logout();
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter((value) => Boolean(value));
            } else {
              forward$ = fromPromise(
                new Promise<void>((resolve) => {
                  pendingRequests.push(() => resolve());
                })
              );
            }
            return forward$.flatMap(() => {
              return forward(operation);
            });
          default:
            // Afficher une pop up en disant qu'on à eu un problème
            // authService.logout();
            return;
        }
      }
    }
  }
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = authService.getToken();
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink.concat(httpLink)]),
  uri: process.env.REACT_APP_API_URL,
  defaultOptions: defaultOptions,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
