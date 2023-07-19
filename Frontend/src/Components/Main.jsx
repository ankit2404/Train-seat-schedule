import React, { useEffect, useState } from 'react'
import Row from './Row'
import axios from 'axios'
import '../App.css'
import { toast } from "react-toastify";
import Loader from './Loader';
function Main() {
  const [arr,setArr] = useState([])
  const [number, setNumber] = useState()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(80)
  const [seatBook, setSeatBook] = useState([])
  useEffect(() => {
    setLoading(true)
  getData()
  },[])
  const getData = async () => {
    
    const data = await axios.get('/api/booking/')
    let nums = data.data[0].seats
    for(let i = 0 ; i < 11; i++){
      nums[i] = 7-nums[i]
    }
    nums[11] = 3-nums[11]

    setTotal(data.data[0]?.total)
    setArr(nums)
    setLoading(false)
  }
  const submitHandler = async(e) => {
    e.preventDefault()
    if(number > 7){
      toast.error("Number should be less than 7")
      setNumber("")
      return
    }
    if(number <= 0){
      toast.error("Number should be greater than 0")
      setNumber("")
      return
    }
    if(number > total){
      toast.error(`only {total} set available `)
      setNumber("")
      return
    }
    setLoading(true)
    const data = await axios.post("/api/booking/", {
      amount : number
    })
    toast.success(`Seat number ${data.data.nums.join(' ')} are booked`)
    setSeatBook(data.data.nums)
    console.log(data.data.nums)
    setNumber("")
    getData()
    
  }
  if (loading) {
    return <Loader />;
  } else {
  return (
    <div>
        <div style={{textAlign: "center"}}>
            <h1>Total Seat Available: {total}</h1>
        </div>
        <div style={{display : "flex", justifyContent: "space-evenly"}}>
        <div style={{width : "30%"}}>
        <div className='row'>
          {Array(8).fill(null).map((_, i) => (
          <div key={i}>
          <button 
          style={{height: "1.5rem", width: "1.5rem", border: "none"}}>{i}</button>
              </div>
            ))}
        </div>

        {arr?.map((el,idx) => {
           if(idx < 11){
            return <Row total={7} filled = {el} start = {'A'.charCodeAt(0) + idx}/>
           }else{
            return <Row total={3} filled = {el} start = {'A'.charCodeAt(0) + idx}/>
           }
        })}
        </div>
        <div>
        <div style={{textAlign: "center" , marginTop : "60px"}}>
            <input placeholder='Enter number of seats' className='input' type='number' max="7" value={number} 
            onChange = {(e) => setNumber(e.target.value)} />
            <button className='btn' onClick={submitHandler}>Book</button>
        </div>
        <div style={{marginTop : "20px"}}>
        <span style={{fontSize: "24px", fontWeight: "600"}}>Your Seat are: </span>
         {seatBook.map((el,idx) => {
          return <>
            <span  style={{fontSize: "18px", fontWeight: "500"}}>{el}</span>
            <span> </span>
          </>
         })}
        </div>
        </div>
        </div>
    </div>
  )
}
}

export default Main