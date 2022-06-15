import { React, useRef } from 'react'
import data from "./ListData.json"
import { Card } from "react-bootstrap";
import Header from './Header';

function MainPage(props) {
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
    return (
    <>
    <Header/>
        <hr></hr>
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
        </Card.Body>))}
        </ul>
    </>
    )}

export default MainPage
