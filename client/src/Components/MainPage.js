import { React } from 'react'
import data from "./ListData.json"
import {Card } from "react-bootstrap";
import Header from './Header';


function MainPageAdmin(props) {
  
    return (<>
    <Header/>
    <hr/>
    
    <ul style={{width:"50%",marginLeft:"80px"}}>
    <div style={{display:"flex", justifyContent:"space-between"}}>
    </div>
            {data.map((item) => (
            <Card.Body key={item.id} style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"inline-block"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{display:"flex"}}>
                   <p style={{fontWeight:"bold",color:"grey",marginRight:"10px",display:`${item.ad===true ? " " :"none" }`}}>Ad ·</p>
                   <p>{item.url}</p>
                  </div>
                   <p >{item.phone}</p>
                </div>
                <div>
                    <p style={{fontSize:"20px",color:"mediumblue"}}>{item.title}</p>
                    <p>{item.description}</p>
                </div>
                </div>
                </Card.Body>))}
        </ul>
    </>
        
          )
      }

export default MainPageAdmin;
