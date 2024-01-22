import AddEvent from './Form';
import { GET_ALL_ENTRY } from '../gql/gql';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';

function Home() {
  const [Event, setEvent] = useState([]);
  const [show, setShow] = useState(false);

  const { loading } = useQuery(GET_ALL_ENTRY, {
    onCompleted: (data) => {
      setEvent(data.getAllEntries);
    }
  })


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (loading) {
    return 'Loading...';
  }

  return (
    <>
      <h2 className='text-center'>
        Hello world!
      </h2>

      <div className='container border text-center p-3' style={{ margin: 'auto' }}>
        <Accordion>
          {Event.map((item, index) => (
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>
                <h3>{item.title}</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Start Time:</strong> {item.time}</p>
                <p><strong>End Time:</strong> {item.timeStop}</p>
                <p><strong>Note:</strong> {item.note}</p>
                <p><strong>Category:</strong> {item.Category || "N/A"}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
          {Event.length <= 0 && <h1>No Records!</h1>}

        </Accordion>
        <Button variant='primary' onClick={handleShow} style={{ width: '100%' }}>Create Entry</Button>

        {show && <AddEvent handleClose={handleClose} show={show} setEvent={setEvent} Event={Event} />}
      </div>
    </>
  );
}

export default Home;
