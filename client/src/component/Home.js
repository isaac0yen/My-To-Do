import React, { useState } from 'react';
import { Accordion, Modal, Button, Form } from 'react-bootstrap';

function Home() {
  const groceryItems = ['Milk', 'Bread', 'Eggs', 'Fruits', 'Vegetables'];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h2 className='text-center'>
        Hello world!
      </h2>
      <div className='container border text-center p-3' style={{ margin: 'auto' }}>
        <Accordion>
          {groceryItems.map((item, index) => (
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>
                {item}
              </Accordion.Header>
              <Accordion.Body>
                Content for {item}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <Button variant='primary' onClick={handleShow} style={{ width: '100%' }}>Create Entry</Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Enter date" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="time" placeholder="Enter start time" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="time" placeholder="Enter end time" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control type="text" placeholder="Enter note" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter category" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Home;
