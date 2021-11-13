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

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log("err -->", err);
        switch (err.message) {
          case "Signature has expired":
            return fromPromise(
              authService.requestRefreshToken().catch((error) => {
                history.push({
                  pathname: "/connexion",
                });
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken: any) => {
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

                // retry the request, returning the new observable
                return forward(operation);
              });
          default:
            history.push({
              pathname: "/connexion",
            });
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
