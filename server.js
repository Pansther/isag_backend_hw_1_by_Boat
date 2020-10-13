const express = require('express'); 
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
 
const app = express();
const upload = multer();

const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const registerRoute = require('./routes/register');
const authRoute = require('./routes/auth');

const PORT = process.env.PORT || 8080;

const uri = `mongodb://boat:boat@cluster0-shard-00-00.0mu0d.mongodb.net:27017,cluster0-shard-00-01.0mu0d.mongodb.net:27017,cluster0-shard-00-02.0mu0d.mongodb.net:27017/ISAG_Backend_HW?ssl=true&replicaSet=atlas-tjkeu0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


require('./configs/passport');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(upload.array());

app.use(indexRoute);
app.use(userRoute);
app.use(registerRoute);
app.use(authRoute);
 
app.listen(PORT, () => {
    console.log(`start server at ${PORT}.`); 
});