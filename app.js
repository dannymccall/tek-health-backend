const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const userRoute = require('./routes/user.route');
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('hello')
})
app.use(userRoute);
const MONGODB_URI = "mongodb+srv://palmer:Academy1@cluster0.ndcp5.mongodb.net/tekHealth?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(PORT, () => {
        console.log('connected')
    })
})
.catch(err => {
    console.log(err)
})

