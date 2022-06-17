import { React, useRef, useState, useEffect } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

function MainPageAdmin(props) {
  const { url } = useParams();
  const [product, setProduct] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [displayURLsec, setDisplayURLsec] = useState("");
  const [titlesec, setTitlesec] = useState("");
  const [descriptionsec, setDescriptionsec] = useState("");
  const [phonesec, setPhonesec] = useState("");
  const [targetURLsec, setTargetURLsec] = useState("");
  const [adsec, setAdsec] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const secondRef = useRef(null);

  const [filteredDataApi, setFilteredDataApi] = useState([]);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
    console.log(isSwitchOn);
  };
  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/google/search/getUrlData/${url}`)
      .then((response) => {
        setFilteredDataApi(response?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("filteredDataApi", filteredDataApi);
  const handleSubmitsec = (e) => {
    e.preventDefault();

    const user = {
      id: uuidv4(),
      url: displayURLsec,
      title: titlesec,
      description: descriptionsec,
      phone: phonesec,
      targeturl: targetURLsec,
      ad: !isSwitchOn,
      pageName: url,
    };

    axios
      .post(`http://localhost:5000/api/google/search/add`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        fetchData();
      });
    setShowModal(false);
  };

  const [show, setShow] = useState(false);

  const [displayURL, setDisplayURL] = useState("");
  const [uid, setUid] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [targetURL, setTargetURL] = useState("");
  const [ad, setAd] = useState("");
  const ref = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ displayURL, title, description, phone, targetURL, ad });
  };

  const handleClick = (item) => {
    console.log("item", item);
    //     ad: true
    // description: "Real-time Threat Protection, Password Manager, Firewall for PC or Mac® & More. Powerful Protection of Your Devices and Personal information. Download It Today! PCMag Editor's Choice. 24/7 Customer Support. Net Banking Accepted. 1 Billion Devices Secured."
    // id: 1
    // phone: "+3189940-987"
    // title: "Norton™ AntiVirus Plus - 2022 - Online Flash Sale: Only RS.499"
    // url: "https://in.norton.com/official-site/india-2022"
    setAd(item.ad);
    setDescription(item.description);
    setPhone(item.phone);
    setTitle(item.title);
    setDisplayURL(item.url);
    setTargetURL(item.targeturl);
    setUid(item.id);
    ref.current.click();
  };

  const deleteClick = (id) => {
    console.log(id);
    const data = filteredDataApi.filter((item) => item.id !== id);
    console.log(data);
    setFilteredDataApi([...data]);
    axios
      // .get(`http://localhost:5000/api/google/search/delete/${id}`)
      .get(
        `http://localhost:5000/api/google/search/delete?pageName=${url}&id=${id}`
      )
      .then((response) => {})
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const user = {
      id: uid,
      url: displayURL,
      title: title,
      description: description,
      phone: phone,
      targeturl: targetURL,
      ad: ad,
      pageName: url,
    };

    axios
      .post(`http://localhost:5000/api/google/search/update`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        fetchData();
      });
    setShowModal(false);
    setShow(false);
  };

  return (
    <>
      <Header />
      <hr />

      <ul style={{ width: "50%", marginLeft: "80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 style={{ marginLeft: "20px" }}>
            <b>Route </b>/{url}
          </h4>

          <Button
            onClick={() => setShowModal(true)}
            style={{ marginRight: "50px" }}
          >
            Add a Product
          </Button>
        </div>
        {filteredDataApi.map((item) => (
          <Card.Body
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "inline-block" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: "2px",
                      display: `${item.ad === true ? " " : "none"}`,
                    }}
                  >
                    Ad ·
                  </p>
                  <p>{item.url}</p>
                </div>
                <p style={{ marginRight: "30px" }}>{item.phone}</p>
              </div>
              <div>
                <p style={{ fontSize: "20px", color: "mediumblue" }}>
                  {item.title}
                </p>
                <p>{item.description}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                height: "38px",
              }}
            >
              <Button
                className="btn-danger"
                onClick={() => deleteClick(item.id)}
              >
                Delete
              </Button>
              <Button
                onClick={() => handleClick(item)}
                style={{ marginLeft: "20px", paddingTop: "5px", width: "50px" }}
              >
                Edit
              </Button>
            </div>
            <>
              <Button
                variant="primary"
                onClick={() => setShow(true)}
                style={{ display: "none" }}
                ref={ref}
              >
                Launch demo modal
              </Button>

              {/* <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      onChange={(e) => setAdsec(e.target.value)}
                      value={adsec}
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label style={{ marginRight: "10px" }}>
                        <b>Ad</b>
                      </Form.Label>
                      <Form.Check
                        onChange={onSwitchAction}
                        checked={isSwitchOn}
                        type="switch"
                        id="custom-switch"
                        value={item.ad}
                      />
                    </Form.Group>
                    <Form.Group
                      onChange={(e) => setDisplayURL(e.target.value)}
                      value={displayURL}
                      className="mb-3"
                      controlId="floatingTextarea2"
                    >
                      <Form.Label>
                        <b>Display URL</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Display URL"
                        value={item.url}
                      />
                    </Form.Group>
                    <Form.Group
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      className="mb-3"
                      controlId="floatingTextarea2"
                    >
                      <Form.Label>
                        <b>Title</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        value={item.title}
                      />
                    </Form.Group>
                    <Form.Group
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className="mb-3"
                      controlId="floatingTextarea2"
                    >
                      <Form.Label>
                        <b>Description</b>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Description"
                        value={item.description}
                      />
                    </Form.Group>
                    <Form.Group
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      className="mb-3"
                      controlId="floatingTextarea2"
                    >
                      <Form.Label>
                        <b>Phone</b>
                      </Form.Label>
                      <Form.Control
                        value={item.phone}
                        type="text"
                        placeholder="Enter Phone"
                      />
                    </Form.Group>
                    <Form.Group
                      onChange={(e) => setTargetURL(e.target.value)}
                      value={targetURL}
                      className="mb-3"
                      controlId="floatingTextarea2"
                    >
                      <Form.Label>
                        <b>Target URL</b>
                      </Form.Label>
                      <Form.Control
                        value={item.url}
                        type="text"
                        placeholder="Enter Target URL"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal> */}
            </>
            <>
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                style={{ display: "none" }}
                ref={secondRef}
              >
                Launch demo modal
              </Button>
            </>
          </Card.Body>
        ))}
      </ul>

      {/* add model */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make a New Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmitsec(e)}>
            <Form.Group
              style={{ display: "flex", justifyContent: "flex-end" }}
              onChange={(e) => setAdsec(e.target.value)}
              value={adsec}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label style={{ marginRight: "10px" }}>
                <b>Ad</b>
              </Form.Label>
              <Form.Check
                onChange={onSwitchAction}
                checked={isSwitchOn}
                type="switch"
                id="custom-switch"
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setDisplayURLsec(e.target.value)}
              value={displayURLsec}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Display URL</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Display URL" />
            </Form.Group>
            <Form.Group
              onChange={(e) => setTitlesec(e.target.value)}
              value={titlesec}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Title" />
            </Form.Group>
            <Form.Group
              onChange={(e) => setDescriptionsec(e.target.value)}
              value={descriptionsec}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control as="textarea" placeholder="Enter Description" />
            </Form.Group>
            <Form.Group
              onChange={(e) => setPhonesec(e.target.value)}
              value={phonesec}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Phone</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Phone" />
            </Form.Group>
            <Form.Group
              onChange={(e) => setTargetURLsec(e.target.value)}
              value={targetURLsec}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Target URL</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Target URL" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* edit model */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmitUpdate(e)}>
            <Form.Group
              style={{ display: "flex", justifyContent: "flex-end" }}
              onChange={(e) => setAdsec(e.target.value)}
              value={adsec}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label style={{ marginRight: "10px" }}>
                <b>Ad</b>
              </Form.Label>
              <Form.Check
                onChange={onSwitchAction}
                checked={isSwitchOn}
                type="switch"
                id="custom-switch"
                value={ad}
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setDisplayURL(e.target.value)}
              value={displayURL}
              className="mb-3"
              controlId="floatingTextarea2"
              value={displayURL}
            >
              <Form.Label>
                <b>Display URL</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Display URL"
                value={displayURL}
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Phone</b>
              </Form.Label>
              <Form.Control
                value={phone}
                type="text"
                placeholder="Enter Phone"
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setTargetURL(e.target.value)}
              value={targetURL}
              className="mb-3"
              controlId="floatingTextarea2"
            >
              <Form.Label>
                <b>Target URL</b>
              </Form.Label>
              <Form.Control
                value={targetURL}
                type="text"
                placeholder="Enter Target URL"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MainPageAdmin;
