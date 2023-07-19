import React from 'react'
import Loading from '../assets/Loading.gif'
const Loader = () => {
  return (
    <div style={{display : "flex", justifyContent: "center", alignItems: "center", "marginTop": "45px"}}>
    <img src = {Loading} alt="loading"/>
    </div>
  )
}

export default Loader