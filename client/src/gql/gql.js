import { gql } from '@apollo/client';

export const ADD_NEW_ENTRY = gql`
mutation CreateEntry($input: Entry) {
  createEntry(input: $input)
}
`

export const GET_ALL_ENTRY = gql`
query Query {
  getAllEntries
}`