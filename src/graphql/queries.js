import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query conferences {
    conferences {
      id
      name
      year
      startDate
      endDate
    }
  }
`;

export const GET_CONFERENCE = gql`
  query GetConferenceDetails($id: ID!) {
    conference(id: $id) {
      id
      name
      year
      slogan
      locations {
        name
        city
        country {
          name
        }
      }
      sponsors {
        name
        about
        image {
          url
        }
      }
      organizer {
        name
        about
        image {
          url
        }
      }
    }
  }
`;
