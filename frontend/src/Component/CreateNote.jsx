import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example({handleCreate}) {
  const [show, setShow] = useState(false);
  const [title , setTitle] = useState("");
  const [discription ,setDiscription]=useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async ()=>{
    handleClose();
    handleCreate(title, discription, handleClose)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. xyz"
                autoFocus
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Discreption</Form.Label>
              <Form.Control as="textarea" rows={3} 
                value={discription}
                onChange={(e)=>setDiscription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;