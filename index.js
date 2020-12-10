const express = require('express')
const mysql=require("mysql")
const bodyParser = require('body-parser')
//const cookieParser=require('cookie-parser')
const router=express.Router();

const app = express()

 const path = require('path')
 const dotenv = require('dotenv')

 dotenv.config({ path: './.env' })

 app.use(express.urlencoded({ extended: false }))
 app.use(express.json());
 


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  insecureAuth: true,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './Public')
app.use(express.static(publicDirectory));

 app.set('view engine', 'hbs');
 const port = 3000

db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


// define routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

// app.get('/', (req,res)=>{
//   res.send('hello');
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})