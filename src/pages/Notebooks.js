import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import {
  Icon,
  Transition,
  Button,
  Modal,
  Input,
  Form,
} from "semantic-ui-react";

import {
  FETCH_NOTEBOOKS_QUERY,
  CREATE_NOTEBOOK_MUTATION,
} from "../utils/graphql";
import "../styles/Notebooks.css";
import NotebookCover from "../components/NotebookCover";

const Notebooks = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [notebooks, setNotebooks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const { loading, data } = useQuery(FETCH_NOTEBOOKS_QUERY, {
    variables: {
      userId: user.id,
    },
    pollInterval: 2000,
  });

  useEffect(() => {
    setNotebooks(data?.getNotebooks);
  }, [data]);

  const [submitNotebook] = useMutation(CREATE_NOTEBOOK_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_NOTEBOOKS_QUERY,
        variables: {
          userId: user.id,
        },
      });
      proxy.writeQuery({
        query: FETCH_NOTEBOOKS_QUERY,
        data: {
          getPosts: [result.data.createNotebook, ...data.getNotebooks],
        },
      });
      setTitle("");
      setNotebooks([result.data.createNotebook, ...notebooks]);
      setModalState(false);
    },
    variables: {
      title,
    },
  });

  return (
    <div className="notebooks">
      {loading ? (
        <h1>Loading notebooks..</h1>
      ) : (
        <Transition.Group>
          {notebooks &&
            notebooks.map((notebook, index) => (
              <NotebookCover
                key={notebook.id}
                notebook={notebook}
                index={index}
              />
            ))}
          <div onClick={() => setModalState(true)} className="notebookCover">
            <Icon name="add" size="big" style={{ marginTop: "50%" }} />
            <p>Create Notebook</p>
          </div>
        </Transition.Group>
      )}
      <Modal
        size="mini"
        dimmer="blurring"
        open={modalState}
        onClose={() => setModalState(false)}
      >
        <Modal.Header>Do you want to create a new notebook?</Modal.Header>
        <Modal.Content>
          <Form noValidate className={loading ? "loading" : ""}>
            <Input
              label="Title"
              placeholder="Enter title.."
              type="text"
              name="title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setModalState(false)}>
            Cancel
          </Button>
          <button
            className="ui button green"
            type="submit"
            disabled={title.trim() === ""}
            onClick={submitNotebook}
          >
            Create Notebook
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Notebooks;
