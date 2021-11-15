/* eslint-disable no-loop-func */
import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
  ApolloProvider,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import "./index.css";
import App, { history } from "./App";
import reportWebVitals from "./reportWebVitals";
import authService from "services/auth.service";

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
                    authService.setStorageLoginRefreshToken(newrefreshToken);
                    const oldHeaders = operation.getContext().headers;
                    // modify the operation context with a new token
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `JWT ${newToken}`,
                      },
                    });
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
              console.log("PASSE LA");
              return forward(operation);
            });
          default:
            authService.logout();
        }
      }
    }
  }
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = authService.getToken();
  console.log("token -->", token);
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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink.concat(httpLink)]),
  uri: process.env.REACT_APP_API_URL,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
