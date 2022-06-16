import { React, useRef, useState } from 'react'
import data from "./ListData.json"
import { Button, Modal, Form, Card } from "react-bootstrap";
import Header from './Header';
import { useParams } from 'react-router-dom';


function MainPageAdmin(props) {
  const { url } = useParams();
  const [product,setProduct] =useState([])


  const [showModal, setShowModal] = useState(false)

  const [ displayURLsec, setDisplayURLsec] = useState("")
  const [ titlesec, setTitlesec] = useState("")
  const [ descriptionsec, setDescriptionsec] = useState("")
  const [phonesec, setPhonesec] = useState("")
  const [targetURLsec, setTargetURLsec] = useState("")
  const [adsec, setAdsec] = useState("")
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const secondRef = useRef(null)

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
    console.log(isSwitchOn)
  };
  
  const handleSubmitsec = (e) =>{
    e.preventDefault()
    setProduct([...product,{
      id:Math.random(0,10000),
      url:displayURLsec,
      title:titlesec,
      description:descriptionsec,
      phone:phonesec,
      targeturl:targetURLsec,
      ad:!isSwitchOn}]);
      console.log([...product,{
        id:Math.random(0,10000),
        url:displayURLsec,
        title:titlesec,
        description:descriptionsec,
        phone:phonesec,
        targeturl:targetURLsec,
        ad:isSwitchOn}])
    setShowModal(false)

  }


  const [show, setShow] = useState(false);

  const [ displayURL, setDisplayURL] = useState("")
  const [ title, setTitle] = useState("")
  const [ description, setDescription] = useState("")
  const [phone, setPhone] = useState("")
  const [targetURL, setTargetURL] = useState("")
  const [ad, setAd] = useState("")
  const ref = useRef(null)
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log({displayURL,title,description,phone,targetURL,ad})
  }

    const handleClick = () => {
        ref.current.click()
    }
    
    return (<>
    <Header/>
    <hr/>
    
    <ul style={{width:"50%",marginLeft:"80px"}}>
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <h4 style={{marginLeft:"20px"}}><b>Route  </b>/{url}</h4>
    
      <Button onClick={()=>setShowModal(true)} style={{marginRight:"50px"}}>Add a Product</Button>
    </div>
            {data.map((item) => (
            <Card.Body key={item.id} style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"inline-block"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{display:"flex"}}>
                   <p style={{fontWeight:"bold",color:"grey",marginRight:"2px",display:`${item.ad===true ? " " :"none" }`}}>Ad ·</p>
                   <p>{item.url}</p>
                  </div>
                   <p style={{marginRight:"30px"}}>{item.phone}</p>
                </div>
                <div>
                    <p style={{fontSize:"20px",color:"mediumblue"}}>{item.title}</p>
                    <p>{item.description}</p>
                </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-around",height:"38px"}}>
                <Button className='btn-danger'>Delete</Button>
                <Button onClick={handleClick} style={{marginLeft:"20px",paddingTop:"5px", width:"50px"}}>Edit</Button>
                </div>
                <>
                <Button variant="primary" onClick={() => setShow(true)} style={{display:"none"}} ref={ref}>
                  Launch demo modal
                </Button>

                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={(e) => handleSubmit(e)}>
                      <Form.Group style={{display:'flex',justifyContent:"flex-end"}} onChange={(e) => setAdsec(e.target.value)} value={adsec} className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{marginRight:"10px"}}><b>Ad</b></Form.Label>
                          <Form.Check 
                            onChange={onSwitchAction}
                            checked={isSwitchOn}
                            type="switch"
                            id="custom-switch"  
                            value={item.ad}              
                          />
                            </Form.Group>
                        <Form.Group onChange={(e) => setDisplayURL(e.target.value)} value={displayURL}  className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Display URL</b></Form.Label>
                          <Form.Control type="text" placeholder="Enter Display URL" value={item.url} />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTitle(e.target.value)} value={title} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Title</b></Form.Label>
                          <Form.Control type="text" placeholder="Enter Title" value={item.title}/>
                        </Form.Group>
                        <Form.Group onChange={(e) => setDescription(e.target.value)} value={description} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Description</b></Form.Label>
                          <Form.Control as="textarea" placeholder="Enter Description" value={item.description}/>
                        </Form.Group>
                        <Form.Group onChange={(e) => setPhone(e.target.value)} value={phone}className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Phone</b></Form.Label>
                          <Form.Control value={item.phone} type="text" placeholder="Enter Phone" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTargetURL(e.target.value)} value={targetURL} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Target URL</b></Form.Label>
                          <Form.Control value={item.url} type="text" placeholder="Enter Target URL" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal></>
                  <>
                <Button variant="primary" onClick={() => setShowModal(true)} style={{display:"none"}} ref={secondRef}>
                  Launch demo modal
                </Button>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Make a New Entry</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={(e) => handleSubmitsec(e)}>
                      <Form.Group style={{display:'flex',justifyContent:"flex-end"}} onChange={(e) => setAdsec(e.target.value)} value={adsec} className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{marginRight:"10px"}}><b>Ad</b></Form.Label>
                          <Form.Check 
                            onChange={onSwitchAction}
                            checked={isSwitchOn}
                            type="switch"
                            id="custom-switch"                
                          />
                            </Form.Group>
                        <Form.Group onChange={(e) => setDisplayURLsec(e.target.value)} value={displayURLsec}  className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Display URL</b></Form.Label>
                          <Form.Control type="text" placeholder="Enter Display URL" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTitlesec(e.target.value)} value={titlesec} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Title</b></Form.Label>
                          <Form.Control  type="text" placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setDescriptionsec(e.target.value)} value={descriptionsec} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Description</b></Form.Label>
                          <Form.Control  as="textarea" placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setPhonesec(e.target.value)} value={phonesec}className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Phone</b></Form.Label>
                          <Form.Control  type="text" placeholder="Enter Phone" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTargetURLsec(e.target.value)} value={targetURLsec} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label><b>Target URL</b></Form.Label>
                          <Form.Control  type="text" placeholder="Enter Target URL" />
                        </Form.Group>
                       
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  </>

                </Card.Body>))}


              <div style={{display:`${product === false?"none":""}`}}>
                {product?.map((element) => (
            <Card.Body key={element.id} style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"inline-block"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{display:"flex"}}>
                   <p style={{fontWeight:"bold",color:"grey",marginRight:"2px",display:`${element.ad===true ? "" :"none" }`}}>Ad ·</p>
                   <p>{element.url}</p>
                  </div>
                   <p style={{marginRight:"30px"}}>{element.phone}</p>
                </div>
                <div>
                    <p style={{fontSize:"20px",color:"mediumblue"}}>{element.title}</p>
                    <p>{element.description}</p>
                </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-around",height:"38px"}}>
                <Button className='btn-danger'>Delete</Button>
                <Button onClick={handleClick} style={{marginLeft:"20px",paddingTop:"5px", width:"50px"}}>Edit</Button>
                </div>
                <>
                <Button variant="primary" onClick={() => setShow(true)} style={{display:"none"}} ref={ref}>
                  Launch demo modal
                </Button>

                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group onChange={(e) => setDisplayURL(e.target.value)} value={displayURL}  className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Display URL</Form.Label>
                          <Form.Control type="text" placeholder="Enter Display URL" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTitle(e.target.value)} value={title} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control type="text" placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setDescription(e.target.value)} value={description} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setPhone(e.target.value)} value={phone}className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="text" placeholder="Enter Phone" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTargetURL(e.target.value)} value={targetURL} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Target URL</Form.Label>
                          <Form.Control type="text" placeholder="Enter Target URL" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setAd(e.target.value)} value={ad} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Ad</Form.Label>
                          <Form.Control type="text" placeholder="Ad" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal></>
                  <>
                <Button variant="primary" onClick={() => setShowModal(true)} style={{display:"none"}} ref={secondRef}>
                  Launch demo modal
                </Button>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Make a New Entry</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={(e) => handleSubmitsec(e)}>
                        <Form.Group onChange={(e) => setDisplayURLsec(e.target.value)} value={displayURLsec}  className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Display URL</Form.Label>
                          <Form.Control type="text" placeholder="Enter Display URL" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTitlesec(e.target.value)} value={titlesec} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control type="text" placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setDescriptionsec(e.target.value)} value={descriptionsec} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setPhonesec(e.target.value)} value={phonesec}className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="text" placeholder="Enter Phone" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setTargetURLsec(e.target.value)} value={targetURLsec} className="mb-3" controlId="floatingTextarea2">
                          <Form.Label>Target URL</Form.Label>
                          <Form.Control type="text" placeholder="Enter Target URL" />
                        </Form.Group>
                        <Form.Group onChange={(e) => setAdsec(e.target.value)} value={adsec} className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Ad</Form.Label>
                          <Form.Control type="text" placeholder="Ad" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  </>

                </Card.Body>))}
              </div>
        </ul>
    </>
        
          )
      }

export default MainPageAdmin;
