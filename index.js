import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/booking", bookingRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Frontend/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api is working");
  });
  app.use(express.static("/Frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"))
  );
}
app.all("*", (req, res) => {
  res.json({ "every thing": "is awesome" });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is on Port ${port}`));