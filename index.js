const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;

const w24studentsSchema = new Schema({
  name: { type: String, required: true },
  studentID: { type: Number, required: true },
});

const W24students = mongoose.model("W24students", w24studentsSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});



app.post('/', async (req, res) => {

  // get the data from the form
  const mongoURL = req.body.myuri

  // connect to the database and log the connection
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");

      // add the data to the database
      // send a response to the user
      const newW24students = new W24students({
        name: "Saubhagya Udani Riligala Konara Herath Mudiyanselage",
        studentID: "300375004",
      });
      
      newW24students
        .save()
        .then(() => {
          res.send(`<h1>Document Added</h1>`);
        })
        .catch((error) => {
          res.send(`<h1>Error Occurred: ${error}</h1>`);
        });
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
