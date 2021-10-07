import { useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import "../styles/Notebook.css";
import {
  FETCH_NOTEBOOK_QUERY,
  CREATE_NOTE_MUTATION,
  EDIT_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
  DELETE_NOTEBOOK_MUTATION,
} from "../utils/graphql";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import {
  Icon,
  Transition,
  Button,
  Modal,
  Input,
  Form,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import SingleNote from "./SingleNote";

const Notebook = (props) => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notebookId, setNotebookId] = useState("");
  const [modalState, setModalState] = useState(false);
  const [viewNoteModalState, setViewNoteModalState] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [Id, setId] = useState("");
  const { loading, data } = useQuery(FETCH_NOTEBOOK_QUERY, {
    variables: {
      userId: user.id,
      title: props.match.params.notebook,
    },
    pollInterval: 2000,
  });

  const [submitNote] = useMutation(CREATE_NOTE_MUTATION, {
    update(proxy, result) {
      proxy.writeQuery({
        query: FETCH_NOTEBOOK_QUERY,
        data: {
          getPosts: result.data.createNote.notes,
        },
      });
      setTitle("");
      setNotes(result.data.createNote.notes);
      setModalState(false);
    },
    variables: {
      notebookId: notebookId,
      title: title,
      body: body,
    },
    onError(err) {
      console.log(err);
    },
  });

  const [editNote] = useMutation(EDIT_NOTE_MUTATION, {
    update(proxy, result) {
      proxy.writeQuery({
        query: FETCH_NOTEBOOK_QUERY,
        data: {
          getPosts: result.data.editNote.notes,
        },
      });
      setModalState(false);
      setNotes(result.data.editNote.notes);
    },
    variables: {
      notebookId: notebookId,
      noteId: Id,
      title: title,
      body: body,
    },
    onError(err) {
      console.log(err);
    },
  });

  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    update(proxy, result) {
      proxy.writeQuery({
        query: FETCH_NOTEBOOK_QUERY,
        data: {
          getPosts: result.data.deleteNote.notes,
        },
      });
      setModalState(false);
      setNotes(result.data.deleteNote.notes);
      setId("");
    },
    onError(err) {
      console.log(err);
    },
  });

  const [deleteNotebook] = useMutation(DELETE_NOTEBOOK_MUTATION, {
    update(proxy, result) {
      history.push("/notebooks");
    },
    variables: {
      notebookId,
    },
  });

  useEffect(() => {
    setNotes(data?.getNotebook?.notes);
    setNotebookId(data?.getNotebook?.id);
  }, [data]);

  const handleClick = (type, data) => {
    if (type === "new") {
      setTitle("");
      setBody("");
      setModalType("create");
    } else if (type === "edit") {
      setTitle(data.title);
      setBody(data.body);
      setId(data.id);
      setModalType("edit");
    }
    setModalState(true);
  };

  const viewNote = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setId(note.id);
    setViewNoteModalState(true);
  };

  const deleteNoteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote({
        variables: {
          notebookId: notebookId,
          noteId: id,
        },
      });
    }
  };

  const deleteNotebookHandler = () => {
    if (window.confirm("Are you sure you want to delete this notebook?")) {
      deleteNotebook({
        variables: {
          notebookId: notebookId,
        },
      });
    }
  };

  const history = useHistory();

  return (
    <Fragment>
      <div className="notes__header">
        <div className="notes__icons">
          <h2>{data?.getNotebook?.title}</h2>
          <Icon name="add" size="large" onClick={() => handleClick("new")} />
          <Icon
            name="trash"
            size="large"
            onClick={() => deleteNotebookHandler()}
          />
        </div>
        <Button
          circular
          icon="arrow left"
          className="note__back"
          content="Back"
          labelPosition="left"
          onClick={() => history.push("/notebooks")}
        />
      </div>
      <div className="notes">
        {loading ? (
          <p>Loading notes...</p>
        ) : (
          <Transition.Group>
            {notes &&
              notes?.map((note) => (
                <SingleNote
                  key={note.id}
                  note={note}
                  deleteNoteHandler={deleteNoteHandler}
                  handleClick={handleClick}
                  viewNote={viewNote}
                />
              ))}
            <div
              onClick={() => handleClick("new")}
              className="note note__create"
            >
              <Icon name="add" size="big" />
              <p>Create Note</p>
            </div>
          </Transition.Group>
        )}
        <Modal
          size="small"
          dimmer="blurring"
          open={modalState}
          onClose={() => setModalState(false)}
        >
          <Modal.Header>
            {modalType === "create" ? "Create Note" : "Edit Note"}
          </Modal.Header>
          <Modal.Content scrolling>
            <Form noValidate className={loading ? "loading" : ""}>
              <p className="label">Note Title*</p>
              <Input
                placeholder="Enter title.."
                type="text"
                name="title"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                className="titleNote"
              />
              <br />
              <p className="label">Note Content*</p>
              <ReactQuill onChange={(e) => setBody(e)} value={body} />
            </Form>
          </Modal.Content>
          {modalType === "create" ? (
            <Modal.Actions>
              <Button onClick={() => setModalState(false)}>Cancel</Button>
              <button
                className="ui button"
                type="submit"
                disabled={title.trim() === ""}
                onClick={submitNote}
              >
                Create Note
              </button>
            </Modal.Actions>
          ) : (
            <Modal.Actions>
              <Button onClick={() => setModalState(false)}>Cancel</Button>
              <button
                className="ui button"
                type="submit"
                disabled={title.trim() === ""}
                onClick={editNote}
              >
                Edit Note
              </button>
            </Modal.Actions>
          )}
        </Modal>
        <Modal
          size="small"
          dimmer="blurring"
          open={viewNoteModalState}
          onClose={() => setViewNoteModalState(false)}
        >
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content scrolling>
            <div>{parse(body)}</div>
          </Modal.Content>
        </Modal>
      </div>
    </Fragment>
  );
};

export default Notebook;
