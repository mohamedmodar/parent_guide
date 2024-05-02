const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000 ;
const router = require("express").Router();

//conected to database
const connectedToDb = require("./config/connectDB");
connectedToDb();

//init app
const app = express();

//middleWare
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//router
app.use("/api/auth",require("./routers/authRouter"));
//app.use("/api/users",require("./routes/userRoter"));

//server
app.listen(PORT, () => {
    console.log(`server is runing in ${process.env.NODE_ENV} up and runing on ${PORT}`)
});

