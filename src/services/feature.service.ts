import { gql } from "@apollo/client";

const GET_FEATURE_BY_NAME = gql`
  query featureFlag($name: String!) {
    featureFlag(name: $name) {
      id
      name
      isActive
    }
  }
`;

export { GET_FEATURE_BY_NAME };
