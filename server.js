const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 4000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/live", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error);
})




app.listen(port, () => {
    console.log(`Connected to localhost : ${port}`);
})

app.use("/auth", require("./server/routes/authRouter"));
