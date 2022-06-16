import React, { useState } from 'react'
import { Accordion, Card, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
const Home = () => {
  

    const [modalShow, setModalShow] = useState(false);
    const [listItem, setListItem] = useState([])
    const [ itemValues, setItemValues] = useState(" ")

    const handleSubmit = () => {
      setModalShow(false)
         setListItem([...listItem,itemValues])
         console.log(listItem)
    }

    const handleDelete = () =>{
        
    }

  return (
    <>
    <Header/>
    <Accordion style={{display:"flex",justifyContent:"center"}} defaultActiveKey="0">
      <Card style={{width:"50%"}}>
        <Card.Header style={{display:"flex", justifyContent:"space-between"}}>
            <div> Page/URL</div>
            <Button className='btn-success' style={{ display: "grid",paddingBottom: "8px",placeItems: "center"}} variant="primary" onClick={() => setModalShow(true)}>
        ADD
      </Button>
        </Card.Header>
        
        {listItem.map((e) => (
        <Accordion.Collapse key={e.slice(2,)} eventKey="0">
          <Card.Body style={{display:"flex",justifyContent:"space-between"}}>
          <Link target="_blank" to={`/find/${e}`}>{e}</Link>
          <Button className='btn-danger' onClick={handleDelete}> Delete </Button>
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
    </>

  )
}

export default Home;
