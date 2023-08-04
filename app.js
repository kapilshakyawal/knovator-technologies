require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");

const app =express()
const cors = require("cors")
// middleware
app.use(express.json())
app.use(cookieParser());

app.use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      maxAge: 3600
    })
  );
mongoose
  .connect(process.env.LOCAL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Db is connected successfully...");
    // If connection is successful, start the server.
    // app.listen(process.env.PORT || 7000);
  })
  .catch((error) => {
    console.log(error);
  });



//   app.use("/", (req,res) => {
//     const apiCall = unirest(
//         "GET",
//         "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
//       );
//       apiCall.headers({
//         "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
//         "x-rapidapi-key": "df39a10df1msh897a8ea144f7dc2p1b5d87jsn991da73633c9"
//       });
//       apiCall.end(function(result) {
//         if (res.error) throw new Error(result.error);
//         console.log(result.body);
//         res.send(result.body);
//       });
//   })



  const user = require("./routes/route")
  app.use("/",user)
  app.listen(process.env.PORT || 7000, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
  