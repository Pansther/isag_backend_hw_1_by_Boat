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

dotenv.config();

const PORT = process.env.PORT || 8080;
 
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


require('./configs/passport');
 
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