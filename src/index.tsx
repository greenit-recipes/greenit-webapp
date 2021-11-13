import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, createHttpLink, InMemoryCache, from, ApolloProvider } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors->', graphQLErrors)
    for (let err of graphQLErrors) {

      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED':

          // Modify the operation context with a new token
          /*const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: getNewToken(),
            },
          });*/
          // Retry the request, returning the new observable
          return forward(operation);
      }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log('token -->', token)
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const client = new ApolloClient({
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
