import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
      default : 80
    },
    seats: {
        type : Array,
        required: true,
    }
   
  },
  {
    timestamps: true,
  }
);


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;