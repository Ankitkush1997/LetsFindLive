import { React, useEffect, useState } from 'react'
import {Card } from "react-bootstrap";
import Header from './Header';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios';


function MainPageAdmin(props) {
    const [filteredDataApi, setFilteredDataApi] = useState([]);
    const [responseMessage,setResponseMessage] = useState("")
    const {url} = useParams()
    const [search] = useSearchParams()

    const state 
                = {
                    click:search.get("click"),
                    ip:search.get("ip"),
                    a:search.get("a"),
                    b:search.get("b"),
                    e:search.get("e")
                  }
  
      const validationForA= state.a !== null ? state.a.length !== 0 & !state.a.includes("{") & !state.a.includes("}") & !state.a.includes("%") & state.a !== "3000000" :false
      
      const validationForB= state.b !== null ? state.b.length !== 0 & !state.b.includes("{") & !state.b.includes("}") & !state.b.includes("%") : false

      const validationForE=state.e !== null ? state.e.length !== 0 & !state.e.includes("{") & !state.e.includes("}") & !state.e.includes("%") & state.e !== "California" :false

      const finalValidation = validationForA & validationForB & validationForE
     

     
 
     const fetchData = () => {
        axios
          .get(`https://search.letsfind.live/api/google/search/getUrlData/${url}`)
          .then((response) => {
            setFilteredDataApi(response?.data?.data);
            setResponseMessage(response.data.message)
          })
          .catch((error) => {
            console.log("error", error);
          });
      };
      useEffect(() => {
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    return (<>
              <Header/>
              <hr/>
                <ul style={{width:"50%",marginLeft:"80px",minHeight:"550px" }}>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                  </div>
                    <>
                        {filteredDataApi?.map((item) => (
                            <Card.Body key={item.id} style={{display:"flex",justifyContent:"space-between"}}>
                              <div style={{ display: "inline-block",width:"80%" }}>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div style={{display:"flex"}}>
                                    <p style={{fontWeight:"bold",color:"grey",marginRight:"10px",display:`${item.ad===true ? " " :"none" }`}}>Ad ·</p>
                                    <p>{item.url}</p>
                                    </div>
                                    
                                    <p style={{display:`${finalValidation?"":"none"}`}}>{item.phone}</p>
                                </div>
                                <div>
                                    <a target="_blank" href={item.targeturl} rel="noreferrer" style={{fontSize:"20px",color:"mediumblue",display:"flex",justifyContent:"space-between"}}>{item.title}</a>
                                    <p style={{width:"100%"}}>{item.description}</p> 
                                </div>
                              </div>
                            </Card.Body>))} 
                                
                        <h1 style={{display:`${responseMessage==="success"?"none":""}`}}>{responseMessage}</h1>
                    </>   
              
                </ul>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", marginBottom:"20px"}}>
                    <Link style={{color:"blue"}} to="/privacy">Privacy & Terms </Link>
                </div>
              </>
        
          )
      }

export default MainPageAdmin;
