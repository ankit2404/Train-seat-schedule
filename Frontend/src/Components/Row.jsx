import React from 'react'
import "../App.css"

function Row({total, filled, start}) {
  let line = String.fromCharCode(start)
  return (
    <div className='row'>
    <div>
    <button 
    style={{height: "1.5rem", width: "1.5rem", border: "none"}}>{line}</button>
    </div>
    {Array(total).fill(null).map((_, i) => (
    <div key={i}>
    <button className={`${i <filled ? "filled" : "empty"}`} 
    style={{height: "1.5rem", width: "1.5rem", border: "none"}}></button>
        </div>
      ))}
    </div>
  )
}

export default Row