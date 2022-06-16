import { Button, Form, Modal } from "react-bootstrap";
import React from 'react'
 
 const CustomModal = (props) => {

  const {
    handleSubmit,
    setDisplayURL,
    setTitle,
    setDescription,
    setPhone,
    setTargetURL,
    setAd,
    setShowModal,
    showModal,
    secondRef,
    displayURL,
    title,
    description,
    phone,
    targetURL,
    ad
  } = props
   return (
    <>
    <Button variant="primary" onClick={() => setShowModal(true)} style={{display:"none"}} ref={secondRef}>
      Launch demo modal
    </Button>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Make a New Entry</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group onChange={(e) => setDisplayURL(e.target.value)} value={displayURL}  className="mb-3" controlId="formBasicEmail">
              <Form.Label>Display URL</Form.Label>
              <Form.Control type="email" placeholder="Enter Display URL" />
            </Form.Group>
            <Form.Group onChange={(e) => setTitle(e.target.value)} value={title} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="email" placeholder="Enter Title" />
            </Form.Group>
            <Form.Group onChange={(e) => setDescription(e.target.value)} value={description} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control type="email" placeholder="Enter Description" />
            </Form.Group>
            <Form.Group onChange={(e) => setPhone(e.target.value)} value={phone}className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="email" placeholder="Enter Phone" />
            </Form.Group>
            <Form.Group onChange={(e) => setTargetURL(e.target.value)} value={targetURL} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Target URL</Form.Label>
              <Form.Control type="email" placeholder="Enter Target URL" />
            </Form.Group>
            <Form.Group onChange={(e) => setAd(e.target.value)} value={ad} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ad</Form.Label>
              <Form.Control type="email" placeholder="Ad" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal></>

   )
 }
 
 export default CustomModal