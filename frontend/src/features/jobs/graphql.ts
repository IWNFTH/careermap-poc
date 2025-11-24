import { gql } from '@/graphql';

// 求人一覧
export const JobsDocument = gql(/* GraphQL */ `
  query Jobs {
    jobs {
      id
      title
      company
      location
    }
  }
`);

// 求人詳細
export const JobDocument = gql(/* GraphQL */ `
  query Job($id: ID!) {
    job(id: $id) {
      id
      title
      company
      location
      description
    }
  }
`);

export const CreateJobDocument = gql(/* GraphQL */ `
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      job {
        id
        title
        company
        location
        url
      }
      errors
    }
  }
`);

export const UpdateJobDocument = gql`
  mutation UpdateJob($input: UpdateJobInput!) {
    updateJob(input: $input) {
      job {
        id
        title
        company
        location
        url
        description
      }
      errors
    }
  }
`;
