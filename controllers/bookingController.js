import Booking from '../models/bookingModel.js'
const resetALl = async(req,res) => {
    let data = await Booking.find({})
    const updatedBooking = await Booking.findByIdAndUpdate({_id: data[0].id}, {
        total : 80,
        seats: [7,7,7,7,7,7,7,7,7,7,7,3]
    },{new: true});
    // console.log(updatedBooking)
    res.status(201).json(updatedBooking)
}
const bookSeat = async(req,res) => {
    let {amount} = req.body
    let data = await Booking.find({})
    let arr = data[0].seats;
    let allSeat = data[0].total;
    let currSum = 0;
    let min = 12;
    let startidx = 0;
    let endidx = 0;
    let idx = 0;
    for(let i = 0 ; i < arr.length; i++){
        currSum += arr[i];
        while(currSum >= amount ){
            let currLen = i-idx+1;
            if(currLen < min){
                min = currLen;
                startidx = idx;
                endidx = i;
            } 
            currSum = currSum- arr[idx];
            idx++;
        }   
    }
    allSeat = allSeat-amount
    let nums = []
    while(amount != 0){
        let char = convertintChar(startidx)
        let n = startidx <11 ? 7 : 3
        if(amount == arr[startidx]){
            for(let i = 0 ; i < amount ; i++){
                nums.push(char + (n-amount+i+1))
            }
            arr[startidx] = 0;
            amount = 0;
        }else if (amount > arr[startidx]){
            for(let i = 0 ; i < arr[startidx] ; i++){
                nums.push(char   + (n-arr[startidx]+i+1))
            }
            amount = amount - arr[startidx];
            arr[startidx] = 0;
            startidx++;
        }else{
            for(let i = 0 ; i < amount; i++){
                nums.push(char  + (n-arr[startidx]+i+1))
            }
            arr[startidx] = arr[startidx]-amount;
            amount = 0;
        }
    }
    const updatedBooking = await Booking.findByIdAndUpdate({_id: data[0].id}, {
        total : allSeat,
        seats: arr
    },{new: true});
    res.status(201).json({nums})
}

function convertintChar(integer) {
    let character = 'A'.charCodeAt(0);
    return String.fromCharCode(character + integer);
   }
const getInitialData = async(req,res) => {
    let data = await Booking.find({})
    res.status(201).json(data)

}
  export {
    bookSeat,
    resetALl,
    getInitialData
  };