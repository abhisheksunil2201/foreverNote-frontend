import { gql } from "@apollo/client";

export const FETCH_NOTEBOOKS_QUERY = gql`
  query ($userId: ID!) {
    getNotebooks(userId: $userId) {
      id
      username
      title
      createdAt
      notes {
        id
        title
        body
        createdAt
      }
    }
  }
`;

export const FETCH_NOTEBOOK_QUERY = gql`
  query ($userId: ID!, $title: String!) {
    getNotebook(userId: $userId, title: $title) {
      id
      title
      notes {
        id
        title
        createdAt
        body
      }
    }
  }
`;

export const CREATE_NOTEBOOK_MUTATION = gql`
  mutation createNotebook($title: String!) {
    createNotebook(title: $title) {
      id
      title
    }
  }
`;

export const DELETE_NOTEBOOK_MUTATION = gql`
  mutation deleteNotebook($notebookId: ID!) {
    deleteNotebook(notebookId: $notebookId) {
      id
      title
    }
  }
`;

export const CREATE_NOTE_MUTATION = gql`
  mutation createNote($notebookId: ID!, $title: String!, $body: String!) {
    createNote(notebookId: $notebookId, title: $title, body: $body) {
      notes {
        id
        title
        body
        createdAt
      }
    }
  }
`;

export const EDIT_NOTE_MUTATION = gql`
  mutation editNote(
    $notebookId: ID!
    $noteId: ID!
    $title: String!
    $body: String!
  ) {
    editNote(
      notebookId: $notebookId
      noteId: $noteId
      title: $title
      body: $body
    ) {
      notes {
        id
        title
        body
        createdAt
      }
    }
  }
`;

export const DELETE_NOTE_MUTATION = gql`
  mutation deleteNote($notebookId: ID!, $noteId: ID!) {
    deleteNote(notebookId: $notebookId, noteId: $noteId) {
      notes {
        id
        title
        body
        createdAt
      }
    }
  }
`;
