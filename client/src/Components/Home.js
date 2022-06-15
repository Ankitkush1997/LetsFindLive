import React, { useState } from 'react'
import { Accordion, Card, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = () => {

    const [modalShow, setModalShow] = useState(false);
    const [listItem, setListItem] = useState([])
    const [ itemValues, setItemValues] = useState(" ")

    const handleSubmit = () => {
         setListItem([...listItem,itemValues])
         console.log(listItem)
    }

    const handleDelete = () =>{
        
    }

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header style={{display:"flex", justifyContent:"space-between"}}>
            <div> Page/URL</div>
            <Button style={{ display: "grid",paddingBottom: "8px",placeItems: "center"}} variant="primary" onClick={() => setModalShow(true)}>
        +
      </Button>
        </Card.Header>
        
        {listItem.map((e) => (
        <Accordion.Collapse key={e.slice(2,)} eventKey="0">
          <Card.Body style={{display:"flex",width:"50%" ,justifyContent:"space-between"}}>
          <Link target="_blank" to={`/${e}`}>{e}</Link>
          <p style={{backgroundColor:"aliceblue"}} onClick={handleDelete}> X </p>
          </Card.Body>
        </Accordion.Collapse>))}
      </Card>
      
      <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
    
      <InputGroup className="mb-2">
        <Form.Control
          onChange={(e) => setItemValues(e.target.value)}
          placeholder="Enter URL to add..."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>ADD</Button>
      </Modal.Footer>
    </Modal>
    </Accordion>
  )
}

export default Home;
