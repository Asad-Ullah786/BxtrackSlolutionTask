const express = require('express');
const mongoos = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const cors = require('cors');
const app = express();

mongoos.connect('mongodb://localhost:27017/Book',
{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>console.log("DB_connected"))
.catch((err)=>console.log(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors());

app.use('/api',routes)
const port = 4200; 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});