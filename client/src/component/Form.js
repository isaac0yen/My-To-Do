import React, { useState } from 'react'
import { ADD_NEW_ENTRY } from '../gql/gql'
import { useMutation } from '@apollo/client'
import { Button, Form, Modal } from 'react-bootstrap'

function AddEvent({ handleClose, show, setEvent, Event }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeStop, setTimeStop] = useState("");
  const [note, setNote] = useState("");
  const [Category, setCategory] = useState("");

  const [CreateEntry, { loading }] = useMutation(ADD_NEW_ENTRY, {
    onCompleted: (data) => {
      handleClose();
      console.log(data);

      setEvent([...Event, {
        title,
        date,
        time,
        timeStop,
        note,
        Category
      }])
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const handleSubmit = () => {
    CreateEntry({
      variables: {
        "input": {
          title,
          date,
          time,
          timeStop,
          note,
          Category
        }
      }
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loading ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Enter date" onChange={e => setDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="time" placeholder="Enter start time" onChange={e => setTime(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="time" placeholder="Enter end time" onChange={e => setTimeStop(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control type="text" placeholder="Enter note" onChange={e => setNote(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter category" onChange={e => setCategory(e.target.value)} />
            </Form.Group>
          </Form>
        ) : <h2>Loading...</h2>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit} disabled={loading}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEvent
