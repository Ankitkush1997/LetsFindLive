import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  InputGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [itemValues, setItemValues] = useState(" ");

const handleClone = ( previousURL ) => {
  
  const newUrl = `${previousURL}${Math.floor(Math.random()*16777215).toString(16)}`

  axios
  .get(`https://www.letsfind.live/api/google/search/clone?newsURL=${newUrl}&previousURL=${previousURL}`)
  .then((response) => {
    // setFilteredDataApi(response?.data?.data);
    fetchUrl();
  })
  .catch((error) => {
    console.log("error", error);
  });

}





  const handleSubmit = () => {
    setEditOn(false)
    addUrl();
    setModalShow(false);
    // setListItem([...listItem, itemValues]);
    console.log(listItem);
  };

  const fetchUrl = () => {
    axios
      .get(`https://search.letsfind.live/api/google/search/allURL`)
      .then((response) => {
        // setFilteredDataApi(response?.data?.data);
        setListItem(response?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  console.log("listItem", listItem);

  const addUrl = () => {
    axios
      .get(`https://search.letsfind.live/api/google/search/add/url/${itemValues}`)
      .then((response) => {
        // setFilteredDataApi(response?.data?.data);
        fetchUrl();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const deleteUrl = (e) => {
    console.log("val", e);
    axios
      .get(`https://search.letsfind.live/api/google/search/delete/url/${e}`)
      .then((response) => {
        // setFilteredDataApi(response?.data?.data);
        fetchUrl();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [editOn, setEditOn] = useState(false)

  const handleEditButton = () => {
    setEditOn(true)
    setModalShow(true) 
  }
  return (
    <>
      <Header />
      <Accordion
        style={{ display: "flex", justifyContent: "center" }}
        defaultActiveKey="0"
      >
        <Card style={{ width: "60%" }}>
          <Card.Header
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div> Page/URL</div>
            <Button
              className="btn-success"
              style={{
                display: "grid",
                paddingBottom: "8px",
                placeItems: "center",
              }}
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              ADD
            </Button>
          </Card.Header>

          {listItem.map((element) => (
            <Accordion.Collapse key={element.slice(2)} eventKey="0">
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Link target="_blank" to={`/admin/${element}`}>
                  {element}
                </Link>
                <div>
                  <Button className="btn-primary" style={{marginRight:"10px"}} onClick={handleEditButton}> Edit</Button>
                  <Button className="btn-success" style={{marginRight:"10px"}} onClick={() => handleClone(element)}> Clone</Button>
                <Button
                  onClick={() => deleteUrl(element)}
                  className="btn-danger"
                >
                
                  Delete
                </Button>

                </div>
               
              </Card.Body>
            </Accordion.Collapse>
          ))}
        </Card>

        <Modal
          show={modalShow}
          onHide={() => {setModalShow(false);
                          setEditOn(false)
                          }}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-2">
              <Form.Control
                onChange={(e) => setItemValues(e.target.value)}
                placeholder="Enter URL to add..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            {editOn && <>
            
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{fontWeight:"bold", display:"flex",justifyContent:"space-between"}} className="mb-2 mt-3"><p>Add optional code</p> <div style={{display:"flex",width:"40%",justifyContent:"space-evenly"}}>
            <p>Line1</p>
              <Form.Check
                // onChange={onSwitchAction}
                // checked={isSwitchOn}
                type="switch"
                id="custom-switch"
              />
              <p>After head</p>
            </div></Form.Label>
              <Form.Control as="textarea" rows={3} />
            
            </Form.Group>
           
            </>}
            
             
                      
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>ADD</Button>
          </Modal.Footer>
        </Modal>
      </Accordion>
    </>
  );
};

export default Home;
