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
    console.log(search.get('e'))
    const [state, setState] =useState({click:search.get("click"),
                                       ip:search.get("ip"),
                                       a:search.get("a"),
                                       b:search.get("b"),
                                       e:search.get("e")})


                                      //  const valueExist = (state.a && state.b && state.ip && state.click && state.e) ? (state?.click?.length < 24 || state?.a?.includes("}") || state?.a == "3000000" || state?.a.includes("%") || state?.a.includes("{") || state?.b.includes("}") ||state?.b.includes("%") || state?.b.includes("{") || state?.e.includes("}")||state?.e.includes("%")|| state?.e.includes("California") || state?.e.includes("california")|| state?.e.includes("{")  ) : false

     
    const valueExist = (state.a && state.b && state.e) ? ( state?.a?.includes("}") || state?.a == "3000000" || state?.a.includes("%") || state?.a.includes("{") || state?.b.includes("}") ||state?.b.includes("%") || state?.b.includes("{") || state?.e.includes("}")||state?.e.includes("%")|| state?.e.includes("California") || state?.e.includes("california")|| state?.e.includes("{")  ) : false
       
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
                                    
                                    <p style={{display:`${valueExist?"none":""}`}}>{item.phone}</p>
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
