const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 4000


const uri = `mongodb+srv://omi-world:omi1307@cluster0.75ewk.mongodb.net/omi?retryWrites=true&w=majority`;
// console.log(process.env.DB_User)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const proCollection = client.db("omi").collection("pro");
   


  app.post('/addProduct',(req, res) => {
      const product = req.body;
      console.log(product);
      res.send(product);
    
      proCollection.insertOne(product)
      .then(result => {
          console.log(result)
          
      })
  })
 client.close();
});


app.listen(port)