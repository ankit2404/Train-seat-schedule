import express from "express";
const router = express.Router();
import {
  bookSeat,resetALl,getInitialData
} from "../controllers/bookingController.js";

router.route("/").post(bookSeat)
router.route("/reset").get(resetALl)
router.route('/').get(getInitialData)

export default router;