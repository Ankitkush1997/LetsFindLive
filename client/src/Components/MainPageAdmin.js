import { React, useRef, useState } from 'react'
import data from "./ListData.json"
import { Button, Modal, Form, Card } from "react-bootstrap";
import Header from './Header';

function MainPageAdmin(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ref = useRef(null)

  const filteredData = data.filter((el) =>
               {if (props.input === '') 
                    {return el;} 
                else {
                  return el.title.toLowerCase().includes(props.input)
                    }})

    const handleClick = () => {
        ref.current.click()
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
      console.log(e)
    }
    const [ displayURL, setDisplayURL] = useState("")
    const [ title, setTitle] = useState("")
    const [ description, setDescription] = useState("")
    const [phone, setPhone] = useState("")
    const [targetURL, setTargetURL] = useState("")
    const [ad, setAd] = useState("")
    
    return (<>
    <Header/>
    <hr/>
    <div style={{width:"100%",display:"flex", justifyContent:"flex-end"}}>
      <Button style={{marginRight:"50px"}}>Add a Product</Button>
    </div>
    
    <ul style={{width:"50%"}}>
            {filteredData.map((item) => (
            <Card.Body key={item.id} style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"inline-block"}}>
                <div style={{display:"flex"}}>
                   <p style={{fontWeight:"bold",color:"grey",display:`${item.ad===true ? " " :"none" }`}}>Ad ·</p>
                   <p>{item.url}</p>
                   <p style={{marginLeft:"30px"}}>{item.phone}</p>
                </div>
                <div>
                    <p style={{fontSize:"20px",color:"mediumblue"}}>{item.title}</p>
                    <p>{item.description}</p>
                </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-around",height:"38px"}}>
                <div style={{backgroundColor:"#ffcccb",padding:"6px 10px 10px 10px", textAlign:"center"}}>X</div>
                <div onClick={handleClick} style={{backgroundColor:"aliceblue",marginLeft:"20px",paddingTop:"5px", width:"50px", textAlign:"center",border:"0.5px solid black"}}>Edit</div>
                </div>
                <>
                <Button variant="primary" onClick={handleShow} style={{display:"none"}} ref={ref}>
                  Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
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
                </Card.Body>))}
        </ul>
    </>
        
          )
      }

export default MainPageAdmin;
