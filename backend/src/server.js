const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require("serverless-http");


require('dotenv').config();

const app = express();
//const router = express.Router();
//const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect("Enter your password");

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const ipRouter = require('../routes/ip');
const arrayRouter = require('../routes/array');

app.use('/.netlify/functions/server/ip',ipRouter)
app.use('/.netlify/functions/server/array',arrayRouter)

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

//app.use(`/.netlify/functions/server`, router);

module.exports = app;
module.exports.handler = serverless(app);